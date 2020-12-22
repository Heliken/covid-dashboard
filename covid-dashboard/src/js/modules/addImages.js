// add images to app template

import rsSchoolLogoUrl from '../../images/rs-school-logo.svg';
import headerLogoUrl from '../../images/logo.svg';
import iconClose from '../../images/icon-close.svg';

export default () => {
  const appTitle = document.querySelector('.app__title');
  const headerLogoEl = document.createElement('img');
  headerLogoEl.src = headerLogoUrl;
  headerLogoEl.classList.add('app__header-logo');
  appTitle.prepend(headerLogoEl);

  const rsLogoLink = document.querySelector('#rsLogoLink');
  const rsSchoolLogoEl = document.createElement('img');
  rsSchoolLogoEl.src = rsSchoolLogoUrl;
  rsSchoolLogoEl.classList.add('app__footer-logo');
  rsLogoLink.prepend(rsSchoolLogoEl);

  const table1Search = document.querySelector('.table1 .search');
  const table1InputCloseEl = document.createElement('img');
  table1InputCloseEl.src = iconClose;
  table1InputCloseEl.classList.add('search__close');
  table1Search.append(table1InputCloseEl);
};
