import SwitchBlock from './SwitchBlock';
import countries from './countries';

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
  },
  createList() {
    countries.stats.forEach((item) => {
      const flagUrl = item.countryInfo.flag;
      const countryName = item.country;
      const countryDefaultValue = item[this.dataType];
      const listUnit = this.createListUnit(flagUrl, countryName, countryDefaultValue);
      this.listElements.push(listUnit);
    });
    this.sortList();
    this.listElements.forEach((item) => this.listBody.append(item));
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
  sortList() {
    this.listElements.sort((a, b) => {
      const prevVal = Number(a.querySelector('.countries-list-unit__value').textContent);
      const nextVal = Number(b.querySelector('.countries-list-unit__value').textContent);
      return prevVal > nextVal ? -1 : 1;
    });
  },
};
