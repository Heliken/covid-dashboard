import dom from './dom.js';
import showWorldsStats from './showWorldStats.js';
import countries from './countries.js';
import showCountryStatsTable1 from './showCountryStatsTable1.js';
import switchSync from './switchSync.js';

export default class {
  constructor() {
    this.worldStatsObj = undefined;
  }

  init() {
    this.loadWorldStats();
    this.initRadioBtn();
    this.initCancelBtn();
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
        showWorldsStats(this.worldStatsObj);
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
      this.worldStatsObj = json;
      localStorage.setItem('worldStats', JSON.stringify(json));
      showWorldsStats(this.worldStatsObj);
    }
  }

  initRadioBtn() {
    dom.t1radioTable1.forEach((radioBtn) => {
      radioBtn.addEventListener('change', (e) => {
        if (dom.t1country.dataset.mode === 'world') {
          showWorldsStats(this.worldStatsObj);
        } else {
          const currCountry = dom.t1country.innerHTML;
          const countryFromStats = countries.stats.find((el) => el.country === currCountry);
          showCountryStatsTable1(countryFromStats);
        }
        switchSync(e.target);
      });
    });
  }

  initCancelBtn() {
    dom.t1cancel.addEventListener('click', () => {
      dom.t1country.dataset.mode = 'world';
      showWorldsStats(this.worldStatsObj);
    });
  }
}
