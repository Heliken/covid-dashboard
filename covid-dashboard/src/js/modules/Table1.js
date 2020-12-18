export default class {
  constructor() {
    this.country = document.querySelector('#table1Country');
    this.infected = document.querySelector('#table1Infected');
    this.recovered = document.querySelector('#table1Recovered');
    this.dead = document.querySelector('#table1Dead');
    this.radioPeriod = document.querySelectorAll('input[name="table1Period"]');
    this.radioQuantity = document.querySelectorAll('input[name="table1Quantity"]');
    this.radioLastDay = document.querySelector('#table1LastDay');
    this.radioAllTime = document.querySelector('#table1AllTime');
    this.radioAllPopulation = document.querySelector('#table1AllPopulation');
    this.radioPer100k = document.querySelector('#table1Per100k');
    this.worldStatsObj = undefined;
  }

  init() {
    this.loadWorldStats();
    this.initRadioBtn();
  }

  async loadWorldStats() {
    this.worldStatsObj = localStorage.getItem('worldStats') ? JSON.parse(localStorage.getItem('worldStats')) : undefined;

    const nowDay = new Date();
    let worldStatsDate;
    // check of we have right object
    if (typeof this.worldStatsObj === 'object' && 'updated' in this.worldStatsObj) {
      worldStatsDate = new Date(this.worldStatsObj.updated);

      // if date matches today or yesterday, then use this stats
      if ((worldStatsDate.getDate() - nowDay.getDate()) < 2) {
        this.showWorldsStats();
      } else {
        // load new stats if stats from localstorage is old
        this.fetchWorldStats();
      }
    } else {
      // load new stats if no stats in localstorage
      this.fetchWorldStats();
    }
  }

  async fetchWorldStats() {
    const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=0');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    } else {
      const json = await response.json();
      console.log('World stats is loaded');
      this.worldStatsObj = json;
      localStorage.setItem('worldStats', JSON.stringify(json));
      this.showWorldsStats();
    }
  }

  showWorldsStats() {
    this.country.textContent = 'World';
    if (this.radioLastDay.checked && this.radioAllPopulation.checked) {
      this.infected.textContent = this.worldStatsObj.todayCases;
      this.recovered.textContent = this.worldStatsObj.todayRecovered;
      this.dead.textContent = this.worldStatsObj.todayDeaths;
    } else if (this.radioLastDay.checked && this.radioPer100k.checked) {
      this.infected.textContent = parseInt((this.worldStatsObj.todayCases * 100000)
      / this.worldStatsObj.population, 10);
      this.recovered.textContent = parseInt((this.worldStatsObj.todayRecovered * 100000)
      / this.worldStatsObj.population, 10);
      this.dead.textContent = parseInt((this.worldStatsObj.todayDeaths * 100000)
      / this.worldStatsObj.population, 10);
    } else if (this.radioAllTime.checked && this.radioAllPopulation.checked) {
      this.infected.textContent = this.worldStatsObj.cases;
      this.recovered.textContent = this.worldStatsObj.recovered;
      this.dead.textContent = this.worldStatsObj.deaths;
    } else if (this.radioAllTime.checked && this.radioPer100k.checked) {
      this.infected.textContent = parseInt((this.worldStatsObj.cases * 100000)
        / this.worldStatsObj.population, 10);
      this.recovered.textContent = parseInt((this.worldStatsObj.recovered * 100000)
        / this.worldStatsObj.population, 10);
      this.dead.textContent = parseInt((this.worldStatsObj.deaths * 100000)
        / this.worldStatsObj.population, 10);
    }
  }

  initRadioBtn() {
    this.radioPeriod.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        this.showWorldsStats();
      });
    });

    this.radioQuantity.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        this.showWorldsStats();
      });
    });
  }
}
