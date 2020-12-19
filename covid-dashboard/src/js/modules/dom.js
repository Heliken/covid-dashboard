export default {
  setElements() {
    this.t1cancel = document.querySelector('.table1__cancel');
    this.t1country = document.querySelector('#table1Country');
    this.t1infected = document.querySelector('#table1Infected');
    this.t1recovered = document.querySelector('#table1Recovered');
    this.t1dead = document.querySelector('#table1Dead');
    this.t1radioTable1 = document.querySelectorAll('.table1__menu input');
    this.t1radioPeriod = document.querySelectorAll('input[name="table1Period"]');
    this.t1radioQuantity = document.querySelectorAll('input[name="table1Quantity"]');
    this.t1radioLastDay = document.querySelector('#table1LastDay');
    this.t1radioAllTime = document.querySelector('#table1AllTime');
    this.t1radioAllPopulation = document.querySelector('#table1AllPopulation');
    this.t1radioPer100k = document.querySelector('#table1Per100k');
  },
};
