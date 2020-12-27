import SwitchBlock from './SwitchBlock';
import countries from './countries';
import switchSync from './switchSync.js';
import syncCountry from './syncCountry.js';

export default {
  listBody: null,
  listElements: [],
  dataType: 'cases',
  currentPeriod: 'all',
  currentQuantity: 'absolute',
  init() {
    this.switchBlock = new SwitchBlock(document.querySelector('.countries-list')).init('countriesList');
    this.listBody = document.querySelector('.countries-list__body');
    this.createList();
    this.addListeners();
  },
  createList() {
    countries.stats.forEach((item) => {
      const flagUrl = item.countryInfo.flag;
      const countryName = item.country;
      const defaultValue = item[this.dataType];
      const listUnit = this.createListUnit(flagUrl, countryName, defaultValue);
      this.listElements.push([listUnit, defaultValue, countryName]);
    });
    this.sortList();
    this.appendList();
  },
  addListeners() {
    const select = this.switchBlock.dataSelect;
    const periodRadio = this.switchBlock.periodInput;
    const quantityRadio = this.switchBlock.quantityInput;
    const countryInput = this.switchBlock.textInput;
    periodRadio.forEach((item) => {
      item.addEventListener('change', (e) => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.currentPeriod = val;
        this.switchListData();
        switchSync(e.target);
      });
    });
    quantityRadio.forEach((item) => {
      item.addEventListener('change', (e) => {
        const name = item.getAttribute('name');
        const val = document.querySelector(`input[name=${name}]:checked`).value;
        this.currentQuantity = val;
        this.switchListData();
        switchSync(e.target);
      });
    });
    select.addEventListener('change', (e) => {
      this.dataType = select.value;
      this.switchListData();
      switchSync(e.target);
    });
    countryInput.addEventListener('input', () => {
      const val = countryInput.value;
      this.hideListElements(val);
    });
    this.listBody.addEventListener('click', (e) => {
      const closestUnit = e.target.closest('.countries-list-unit');
      if (closestUnit) {
        const title = closestUnit.querySelector('.countries-list-unit__title').textContent;
        syncCountry(title);
      }
    });
  },
  appendList() {
    this.clearList();
    this.listElements.forEach((item) => this.listBody.append(item[0]));
  },
  switchListData() {
    this.listElements.forEach((item) => {
      const DOMItem = item[0];
      const countryName = item[2];
      const countryData = countries.stats.find((dataItem) => dataItem.country === countryName);
      const countryPopulation = countryData.population;
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      const dataToSearch = this.currentPeriod === 'all' ? this.dataType : `today${capitalizeFirstLetter(this.dataType)}`;
      let newValue = countryData[dataToSearch];
      if (this.currentQuantity === 'relative') {
        const populationCoefficient = 100000 / countryPopulation;
        newValue *= populationCoefficient;
        newValue = newValue.toFixed(3);
      }
      newValue = newValue.toString() === 'Infinity' ? 0 : newValue;
      // eslint-disable-next-line no-param-reassign
      item[1] = newValue;
      DOMItem.querySelector('.countries-list-unit__value').textContent = newValue;
    });
    this.sortList();
    this.appendList();
  },
  clearList() {
    this.listBody.innerHTML = '';
  },
  createListUnit(flag, name, value) {
    function createElement(type, className, content) {
      const elem = document.createElement(type);
      elem.classList.add(className);
      if (content) {
        elem.innerHTML = content;
      }
      return elem;
    }
    const listUnit = createElement('div', 'countries-list-unit');
    const flagElem = createElement('img', 'countries-list-unit__flag');
    flagElem.src = flag;
    const valueElem = createElement('div', 'countries-list-unit__value', value);
    const titleElem = createElement('div', 'countries-list-unit__title', name);
    listUnit.append(flagElem);
    listUnit.append(titleElem);
    listUnit.append(valueElem);
    return listUnit;
  },
  hideListElements(val) {
    const hiddenClass = 'countries-list-unit--hidden';
    this.listElements.forEach((item) => {
      const countryName = item[2];
      if (!countryName.toLowerCase().includes(val.toLowerCase())) {
        item[0].classList.add(hiddenClass);
      } else {
        item[0].classList.remove(hiddenClass);
      }
    });
  },
  sortList() {
    this.listElements.sort((a, b) => {
      const prevVal = Number(a[1]);
      const nextVal = Number(b[1]);
      return prevVal > nextVal ? -1 : 1;
    });
  },
};
