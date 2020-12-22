import dom from './dom.js';

export default () => {
  const btnFull = document.querySelector('.map-fullscreen');

  btnFull.addEventListener('click', () => {
    dom.appHeader.classList.toggle('app__header_hidden');
    dom.appCol1.classList.toggle('app__col1_hidden');
    dom.appCol3.classList.toggle('app__col3_hidden');
    dom.appFooter.classList.toggle('app__footer_hidden');
    dom.legend.classList.toggle('legend_fullscreen');
    btnFull.classList.toggle('map-fullscreen_exit');
  });
};
