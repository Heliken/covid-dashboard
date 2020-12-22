import Chart from 'chart.js';
import chartOptions from './chartOptions.js';
import SwitchBlock from './SwitchBlock';
import countries from './countries';

export default {
  chartError: null,
  chartElem: null,
  chartObject: null,
  updateButton: null,
  worldData: null,
  switchBlock: null,
  countryData: null,
  dataType: 'cases',
  currentPeriod: 'all',
  currentQuantity: 'absolute',
  showingWorldStats: true,
  country: null,
  worldPopulation: null,
  controller: null,
  async getDataFromAPI(dataUrl) {
    const request = await fetch(dataUrl);
    const data = await request.json();
    return data;
  },
  init(controller) {
    this.controller = controller;
    this.switchBlock = new SwitchBlock(document.querySelector('.chart')).init();
    this.addListeners();
    this.getPopulation();
    this.chartElem = document.getElementById('chart');
    this.chartError = document.querySelector('.chart__error');
    this.getDataFromAPI('https://disease.sh/v3/covid-19/historical/all?lastdays=366').then((data) => {
      this.worldData = data;
      const dataArray = this.getData();
      this.buildChart(dataArray, 'Number of cases');
    });
  },
  addListeners() {
    const select = this.switchBlock.dataSelect;
    const periodRadio = this.switchBlock.periodInput;
    const quantityRadio = this.switchBlock.quantityInput;
    const dropdownUnits = this.switchBlock.dropdownElements;
    const worldButton = this.switchBlock.resetButton;
    periodRadio.forEach((item) => {
      item.addEventListener('change', () => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.controller.updateParameters([['currentPeriod', val]]);
      });
    });
    quantityRadio.forEach((item) => {
      item.addEventListener('change', () => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.controller.updateParameters([['currentQuantity', val]]);
      });
    });
    dropdownUnits.forEach((item) => {
      item.addEventListener('mousedown', () => {
        const countryName = item.textContent;
        this.controller.updateParameters([['country', countryName], ['showingWorldStats', false]]);
      });
    });
    select.addEventListener('change', () => {
      this.controller.updateParameters([['dataType', select.value]]);
    });
    worldButton.addEventListener('click', () => {
      this.showingWorldStats = true;
      this.controller.updateParameters([['showingWorldStats', true]]);
    });
  },
  setCountryData(countryName) {
    this.showingWorldStats = false;
    if (this.country !== countryName) {
      this.chartElem.classList.add('loading');
      this.country = countryName;
      this.getCountryData(this.country);
    } else {
      this.switchChartData();
    }
    this.switchBlock.setTitle(this.country);
  },
  async switchChartData() {
    const chartTitle = this.showingWorldStats ? 'World' : this.country;
    this.switchBlock.setTitle(chartTitle);
    const title = `Number of ${this.dataType}`;
    this.chartObject.data.datasets[0].label = title;
    this.chartObject.data.datasets[0].data = this.getData();
    this.hideError();
    this.chartElem.classList.remove('loading');
    this.chartObject.update();
  },
  getCountryData(country) {
    this.getDataFromAPI(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`).then((data) => {
      if (data.message) {
        this.showError(data.message);
      } else {
        this.countryData = data.timeline;
        this.switchChartData();
      }
    });
  },
  getData() {
    let originalData;
    if (this.showingWorldStats) {
      originalData = this.worldData;
    } else {
      originalData = this.countryData;
    }
    return this.formatDataForChart(originalData);
  },
  showError(text) {
    this.chartError.textContent = text;
    this.chartError.classList.add('chart__error--shown');
  },
  hideError() {
    this.chartError.classList.remove('chart__error--shown');
  },
  formatDataForChart(data) {
    return Object.entries(data[this.dataType]).map((item, index, array) => {
      const [date, value] = item;
      const dateObj = new Date(date);
      let amount;
      if (this.currentPeriod === 'all') {
        amount = value;
      } else {
        amount = index > 0 ? value - array[index - 1][1] : value;
      }
      if (this.currentQuantity === 'relative') {
        const populationCoefficient = 100000 / this.worldPopulation;
        amount *= populationCoefficient;
        amount = amount.toFixed(3);
      }
      return {
        x: dateObj,
        y: amount,
      };
    });
  },
  buildChart(data, title) {
    this.chartObject = new Chart(this.chartElem, {
      type: 'bar',
      data: {
        datasets: [{
          barPercentage: 1,
          categoryPercentage: 1,
          borderWidth: 0,
          backgroundColor: 'rgba(191, 22, 10, 1)',
          label: title,
          data,
        }],
      },
      options: chartOptions,
    });
  },
  getPopulation() {
    const wrld = countries.stats.reduce((a, b) => ({ population: a.population + b.population }));
    this.worldPopulation = wrld.population;
  },
  updateParams(dataParams) {
    const newCountry = this.country !== dataParams.country;
    this.updateSwitchBlock(dataParams);
    this.updateParamsValues(dataParams);
    if (newCountry) {
      this.setCountryData(dataParams.country);
    } else {
      this.switchChartData();
    }
  },
  updateParamsValues(dataParams) {
    this.dataType = dataParams.dataType;
    this.currentPeriod = dataParams.currentPeriod;
    this.currentQuantity = dataParams.currentQuantity;
    this.showingWorldStats = dataParams.showingWorldStats;
  },
  updateSwitchBlock(dataParams) {
    this.switchBlock.dataSelect.value = dataParams.dataType;
    this.checkNeededRadio(this.switchBlock.quantityInput, dataParams.currentQuantity);
    this.checkNeededRadio(this.switchBlock.periodInput, dataParams.currentPeriod);
  },
  checkNeededRadio(radiobuttons, value) {
    radiobuttons.forEach((item) => {
      const element = item;
      if (element.value === value) {
        element.checked = true;
      }
    });
  },
};
