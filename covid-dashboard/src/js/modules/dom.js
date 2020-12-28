export default {
  setElements() {
    this.appHeader = document.querySelector('.app__header');
    this.appCol1 = document.querySelector('.app__col1');
    this.appCol3 = document.querySelector('.app__col3');
    this.appFooter = document.querySelector('.app__footer');

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

    this.legend = document.querySelector('.legend');
    this.legendTitle = document.querySelector('.legend__title');
    this.legendMenu = document.querySelector('.legend__menu');
    this.legendInner = document.querySelector('.legend__inner');
    this.legendArrow = document.querySelector('.legend__arrow');
    this.legendInfection = document.querySelector('.infection');
    this.legendSelect = document.querySelector('.legend__select');
    this.legendRadioAll = document.querySelectorAll('.legend input[type="radio"]');
    this.legendRadioLastDay = document.querySelector('#mapLastDay');
    this.legendRadioAllTime = document.querySelector('#mapAllTime');
    this.legendRadioAllPopulation = document.querySelector('#mapAllPopulation');
    this.legendRadioPer100k = document.querySelector('#mapPer100k');

    this.map = document.querySelector('.map');
    this.col2 = document.querySelector('.app__col2');

    this.isSwitchSyncAllowed = true;
  },
};
