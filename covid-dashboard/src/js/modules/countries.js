export default {
  stats: localStorage.getItem('allCountries') ? JSON.parse(localStorage.getItem('allCountries')) : undefined,
  loadStats() {
    // load stats only if there are no stats in localstorage or stats is older than 2 days
    const nowDay = new Date();
    let countriesStatsDate;
    // check of we have right object
    if (Array.isArray(this.stats) && 'updated' in this.stats[0]) {
      countriesStatsDate = new Date(this.stats[0].updated);

      // if date doesn't match today or yesterday, then load new stats by API
      if ((countriesStatsDate.getDate() - nowDay.getDate()) > 2) {
        this.fetchCountriesStats();
      }
    } else {
      this.fetchCountriesStats();
    }
  },
  async fetchCountriesStats() {
    const response = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=todayCases&allowNull=0');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    } else {
      const json = await response.json();
      console.log('Countries stats is loaded');
      this.stats = json;
      localStorage.setItem('allCountries', JSON.stringify(json));
    }
  },

};
