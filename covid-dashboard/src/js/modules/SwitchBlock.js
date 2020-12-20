import blockTemplate from '../html/SwitchBlockTemplate.html';
import countries from './countries';

const stringToHTML = (string) => {
  const elem = document.createElement('div');
  elem.classList.add('switch-block');
  elem.innerHTML = string;
  return elem;
};

export default class SwitchBlock {
  constructor(parent) {
    this.parent = parent;
    this.template = blockTemplate;
    this.dropdownElements = [];
  }

  init() {
    this.prependToParent();
    return this;
  }

  prependToParent() {
    this.parent.prepend(stringToHTML(this.template));
    this.getDOMElements();
    this.generateSelectionFields();
    this.addInputSearch();
  }

  getDOMElements() {
    this.textInput = this.parent.querySelector('input[type="text"]');
    this.resetButton = this.parent.querySelector('.switch-block__button');
    this.textInputDropdown = this.parent.querySelector('.switch-block-search__body');
    this.periodInput = this.parent.querySelectorAll('.radiogroup--period input');
    this.quantityInput = this.parent.querySelectorAll('.radiogroup--quantity input');
    this.title = this.parent.querySelector('.switch-block__title');
    this.dataSelect = this.parent.querySelector('select');
    this.resetButton.addEventListener('click', () => {
      this.textInput.value = '';
    });
    this.setNameForInputs();
  }

  setNameForInputs() {
    let randomNumberForUniqueRadioName = Math.round(Math.random() * 10000);
    this.periodInput.forEach((item) => {
      item.setAttribute('name', `input-${randomNumberForUniqueRadioName}`);
    });
    randomNumberForUniqueRadioName = Math.round(Math.random() * 10000);
    this.quantityInput.forEach((item) => {
      item.setAttribute('name', `input-${randomNumberForUniqueRadioName}`);
    });
  }

  addInputSearch() {
    const input = this.textInput;
    input.addEventListener('input', () => {
      const val = input.value;
      this.filterDropdown(val);
    });
    input.addEventListener('focus', () => {
      const val = input.value;
      this.filterDropdown(val);
    });
    input.addEventListener('blur', () => {
      this.hideDropdown();
    });
  }

  filterDropdown(val) {
    const dropdown = this.textInputDropdown;
    const dropdownActiveClass = 'switch-block-search__body--shown';
    const unitActiveClass = 'switch-block-search__unit--shown';
    this.dropdownElements.forEach((item) => {
      if (val.length > 0) {
        if (item.textContent.toLowerCase().startsWith(val.toLowerCase())) {
          item.classList.add(unitActiveClass);
        } else {
          item.classList.remove(unitActiveClass);
        }
        if (document.querySelectorAll(`.${unitActiveClass}`).length > 0) {
          dropdown.classList.add(dropdownActiveClass);
        } else {
          this.hideDropdown();
        }
      } else {
        item.classList.remove(unitActiveClass);
        this.hideDropdown();
      }
    });
  }

  generateSelectionFields() {
    countries.stats.forEach((item) => {
      const elem = document.createElement('div');
      elem.classList.add('switch-block-search__unit');
      elem.innerHTML = item.country;
      this.dropdownElements.push(elem);
      this.textInputDropdown.append(elem);
      elem.addEventListener('click', () => {
        this.textInput.value = elem.textContent;
      });
    });
  }

  hideDropdown() {
    this.textInputDropdown.classList.remove('switch-block-search__body--shown');
  }

  setTitle(title) {
    this.title.innerHTML = title;
  }
}
