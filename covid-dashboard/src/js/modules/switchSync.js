// function set the same value for all inputs or selects with one classname

import dom from './dom.js';

const dispatchElements = (elemArr, elemFired) => {
  const event = new Event('change');

  // set to false, so that clicked input or select can't to run switchSync fuction again
  dom.isSwitchSyncAllowed = false;

  if (elemFired.tagName === 'INPUT') {
    elemArr.forEach((input) => {
      const inputEl = input;
      inputEl.checked = true;
      inputEl.dispatchEvent(event);
      return false;
    });
  } else if (elemFired.tagName === 'SELECT') {
    const elemFiredOptions = elemFired.children;

    let optionIndex;
    // find index of selected option in select menu
    Array.from(elemFiredOptions).find((option, index) => {
      if (option.selected === true) {
        optionIndex = index;
        return true;
      }
      return false;
    });

    // set for each select the same option value (elemArr - array of all select tags)
    elemArr.forEach((select) => {
      const selectEl = select;
      const selectElOptions = selectEl.children; // array of all options
      selectElOptions[optionIndex].selected = true;
      selectEl.dispatchEvent(event); // trigger 'change' event
      return false;
    });
  }

  dom.isSwitchSyncAllowed = true;
};

export default (elemFired) => {
  // find classname starting from 'js-' in elemFired classList
  const elemFiredClass = Array.from(elemFired.classList).find((el) => {
    if (el.startsWith('js-')) return true;
    return false;
  });

  // select all elements (inputs or selects) with finded classname
  const elemArr = document.querySelectorAll(`input.${elemFiredClass}, select.${elemFiredClass}`);

  if (dom.isSwitchSyncAllowed) {
    console.log('dispatchElements');
    dispatchElements(elemArr, elemFired);
  }
};
