import SwitchBlock from './SwitchBlock';
import countries from './countries';

export default {
  listBody: null,
  listElements: [],
  dataType: 'cases',
  currentPeriod: 'all',
  currentQuantity: 'absolute',
  controller: null,
  switchBlock: null,
  init(controller) {
    this.controller = controller;
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
      this.listElements.push(listUnit);
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
    select.addEventListener('change', () => {
      this.controller.updateParameters([['dataType', select.value]]);
    });
    countryInput.addEventListener('input', () => {
      const val = countryInput.value;
      this.hideListElements(val);
    });
  },
  appendList() {
    this.listElements.forEach((item) => this.listBody.append(item));
  },
  switchListData() {
    this.listElements.forEach((item) => {
      const itemUnit = item;
      const country = item.querySelector('.countries-list-unit__title').textContent;
      const countryData = countries.stats.find((dataItem) => dataItem.country === country);
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
      itemUnit.querySelector('.countries-list-unit__value').textContent = newValue;
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
    listUnit.addEventListener('click', () => {
      this.controller.updateParameters([['country', name], ['showingWorldStats', false]]);
    });
    return listUnit;
  },
  hideListElements(val) {
    const hiddenClass = 'countries-list-unit--hidden';
    this.listElements.forEach((item) => {
      const countryName = item.querySelector('.countries-list-unit__title').textContent;
      if (!countryName.toLowerCase().includes(val.toLowerCase())) {
        item.classList.add(hiddenClass);
      } else {
        item.classList.remove(hiddenClass);
      }
    });
  },
  sortList() {
    this.listElements.sort((a, b) => {
      const prevVal = Number(a.querySelector('.countries-list-unit__value').textContent);
      const nextVal = Number(b.querySelector('.countries-list-unit__value').textContent);
      return prevVal > nextVal ? -1 : 1;
    });
  },
  updateParams() {
    this.switchListData();
  },
};
