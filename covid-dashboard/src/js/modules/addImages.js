// add images to app template

import rsSchoolLogoUrl from '../../images/rs-school-logo.svg';
import headerLogoUrl from '../../images/logo.svg';

export default () => {
  const appHeader = document.querySelector('.app__header');
  const headerLogoEl = document.createElement('img');
  headerLogoEl.src = headerLogoUrl;
  headerLogoEl.classList.add('app__header-logo');
  appHeader.prepend(headerLogoEl);

  const rsLogoLink = document.querySelector('#rsLogoLink');
  const rsSchoolLogoEl = document.createElement('img');
  rsSchoolLogoEl.src = rsSchoolLogoUrl;
  rsSchoolLogoEl.classList.add('app__footer-logo');
  rsLogoLink.prepend(rsSchoolLogoEl);
};
