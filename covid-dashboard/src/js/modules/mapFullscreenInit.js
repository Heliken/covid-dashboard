import dom from './dom.js';

export default () => {
  const btnFull = document.querySelector('.map-fullscreen');

  btnFull.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 1000px)').matches) {
      dom.col2.classList.toggle('app__col2_fullscreen');
      btnFull.classList.toggle('map-fullscreen_exit');
      setTimeout(() => { dom.map.invalidateSize(); }, 100);
    } else {
      dom.appHeader.classList.toggle('app__header_hidden');
      dom.appCol1.classList.toggle('app__col1_hidden');
      dom.appCol3.classList.toggle('app__col3_hidden');
      dom.appFooter.classList.toggle('app__footer_hidden');
      dom.legend.classList.toggle('legend_fullscreen');
      btnFull.classList.toggle('map-fullscreen_exit');
    }
  });
};
