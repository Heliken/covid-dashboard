import mapMarkersUpdate from './mapMarkersUpdate.js';
import switchSync from './switchSync.js';
import dom from './dom.js';

export default () => {
  dom.legendRadioAll.forEach((radioBtn) => {
    radioBtn.addEventListener('change', (e) => {
      mapMarkersUpdate();
      switchSync(e.target);
    });
  });
  dom.legendSelect.addEventListener('change', (e) => {
    mapMarkersUpdate();
    switchSync(e.target);
  });
};
