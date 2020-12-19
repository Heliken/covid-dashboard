import blockTemplate from '../html/SwitchBlockTemplate.html';

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
  }

  init() {
    this.prependToParent();
    return this;
  }

  prependToParent() {
    this.parent.prepend(stringToHTML(this.template));
    this.getDOMElements();
  }

  getDOMElements() {
    this.periodInput = this.parent.querySelectorAll('.radiogroup--period input');
    this.quantityInput = this.parent.querySelectorAll('.radiogroup--quantity input');
    this.dataSelect = this.parent.querySelector('select');
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
}
