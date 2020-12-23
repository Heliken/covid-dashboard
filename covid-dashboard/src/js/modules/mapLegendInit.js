import dom from './dom.js';

export default () => {
  dom.legendTitle.addEventListener('click', () => {
    dom.legendInner.classList.toggle('legend__inner_active');
    dom.legendArrow.classList.toggle('legend__arrow_active');
  });
};
