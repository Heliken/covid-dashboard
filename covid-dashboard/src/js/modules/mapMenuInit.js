import mapMarkersUpdate from './mapMarkersUpdate.js';
import dom from './dom.js';

export default () => {
  dom.legendRadioAll.forEach((radioBtn) => {
    radioBtn.addEventListener('change', () => {
      mapMarkersUpdate();
    });
  });
  dom.legendSelect.addEventListener('change', () => {
    mapMarkersUpdate();
  });
};
