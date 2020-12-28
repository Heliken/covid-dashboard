// insert an app template into a tag body

import appHtml from '../html/appHtml.html';

export default () => {
  const bodyEl = document.querySelector('body');
  bodyEl.innerHTML = appHtml;
};
