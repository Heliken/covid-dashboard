import Chart from 'chart.js';
import chartOptions from './chartOptions.js';
import SwitchBlock from './SwitchBlock';
import countries from './countries';
import switchSync from './switchSync.js';

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
  async getDataFromAPI(dataUrl) {
    const request = await fetch(dataUrl);
    const data = await request.json();
    return data;
  },
  init() {
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
      item.addEventListener('change', (e) => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.currentPeriod = val;
        this.switchChartData();
        switchSync(e.target);
      });
    });
    quantityRadio.forEach((item) => {
      item.addEventListener('change', (e) => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.currentQuantity = val;
        this.switchChartData();
        switchSync(e.target);
      });
    });
    dropdownUnits.forEach((item) => {
      item.addEventListener('mousedown', () => {
        this.showingWorldStats = false;
        if (this.country !== item.textContent) {
          this.chartElem.classList.add('loading');
          this.country = item.textContent;
          this.getDataFromAPI(`https://disease.sh/v3/covid-19/historical/${this.country}?lastdays=366`).then((data) => {
            if (data.message) {
              this.showError(data.message);
            } else {
              this.countryData = data.timeline;
              this.switchChartData();
            }
          });
        } else {
          this.switchChartData();
        }
        this.switchBlock.setTitle(this.country);
      });
    });
    select.addEventListener('change', (e) => {
      this.dataType = select.value;
      this.switchChartData();
      switchSync(e.target);
    });
    worldButton.addEventListener('click', () => {
      this.showingWorldStats = true;
      this.switchBlock.setTitle('World');
      this.switchChartData();
    });
  },
  async switchChartData() {
    const title = `Number of ${this.dataType}`;
    this.chartObject.data.datasets[0].label = title;
    this.chartObject.data.datasets[0].data = this.getData();
    this.hideError();
    this.chartElem.classList.remove('loading');
    this.chartObject.update();
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
};
