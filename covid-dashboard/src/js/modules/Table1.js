export default class {
  constructor() {
    this.input = document.querySelector('.table1__input');
    this.worldStatsObj = undefined;
  }

  get worldStats() {
    this.worldStatsObj = JSON.parse(localStorage.getItem('worldStats'));

    const nowDay = new Date();
    let worldStatsDate;
    if (this.worldStatsObj) {
      worldStatsDate = new Date(this.worldStatsObj.updated);
    }

    // if worldStats exists in localstorage and its date today or yesterday, then use it
    if (this.worldStatsObj && (worldStatsDate.getDate() - nowDay.getDate()) < 2) {
      return this.worldStatsObj;
    }

    return false;
  }

  fetchWorldStats() {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        this.worldStatsObj = json;
        localStorage.setItem('worldStats', JSON.stringify(json));
      });
  }
}
