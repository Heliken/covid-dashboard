import Chart from 'chart.js';
import chartOptions from './chartOptions.js';
import SwitchBlock from './SwitchBlock';

export default {
  chartElem: null,
  chartObject: null,
  updateButton: null,
  data: null,
  switchBlock: null,
  currentData: 'cases',
  currentPeriod: 'all',
  async getData(dataUrl) {
    const request = await fetch(dataUrl);
    const data = await request.json();
    return data;
  },
  init() {
    this.switchBlock = new SwitchBlock(document.querySelector('.chart')).init();
    this.addListeners();
    this.chartElem = document.getElementById('chart');
    this.getData('https://disease.sh/v3/covid-19/historical/all?lastdays=366').then((data) => {
      this.data = data;
      const dataArray = this.formatDataForChart();
      this.buildChart(dataArray, 'Number of cases');
    });
  },
  addListeners() {
    const select = this.switchBlock.dataSelect;
    const periodRadio = this.switchBlock.periodInput;
    periodRadio.forEach((item) => {
      item.addEventListener('change', () => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.currentPeriod = val;
        this.switchChartData();
      });
    });
    select.addEventListener('change', () => {
      this.currentData = select.value;
      this.switchChartData();
    });
  },
  switchChartData() {
    const title = `Number of ${this.currentData}`;
    this.chartObject.data.datasets[0].label = title;
    this.chartObject.data.datasets[0].data = this.formatDataForChart(this.data[this.currentData]);
    this.chartObject.update();
  },
  formatDataForChart() {
    return Object.entries(this.data[this.currentData]).map((item, index, array) => {
      const [date, value] = item;
      const dateObj = new Date(date);
      let amount;
      if (this.currentPeriod === 'all') {
        amount = value;
      } else {
        amount = index > 0 ? value - array[index - 1][1] : value;
      }
      return {
        x: dateObj,
        y: amount,
      };
    });
  },
  buildChart(data, title) {
    this.chartObject = new Chart(this.chartElem, {
      type: 'line',
      data: {
        datasets: [{
          borderWidth: 0,
          backgroundColor: 'rgba(191, 22, 10, 1)',
          label: title,
          data,
        }],
      },
      options: chartOptions,
    });
  },
};
