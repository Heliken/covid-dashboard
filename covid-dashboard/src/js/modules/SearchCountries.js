import countries from './countries.js';
import dom from './dom.js';
import showCountryStatsTable1 from './showCountryStatsTable1.js';

export default class {
  constructor() {
    this.input = document.querySelector('#table1Input');
    this.drop = document.querySelector('.table1 .search__drop');
    this.close = document.querySelector('.table1 .search__close');
  }

  init() {
    this.initInput();
    this.initCloseIcon();
    this.initCountryChooseInDrop();
    this.closeDropOnClickOutside();
  }

  initInput() {
    this.input.addEventListener('input', () => {
      const userWord = this.input.value.toLowerCase();
      if (userWord.length > 0) {
        const searchDropHtml = this.createDropCountries(userWord);
        this.drop.innerHTML = searchDropHtml;
        this.drop.classList.add('search__drop_active');
        this.close.classList.add('search__close_active');
      } else {
        this.drop.classList.remove('search__drop_active');
        this.close.classList.remove('search__close_active');
      }
    });
  }

  createDropCountries(userWord) {
    this.arr = countries.stats;
    let finalHtml = this.arr.reduce((dropHtml, el) => {
      if (el.country.toLowerCase().startsWith(userWord.toLowerCase())) {
        return `${dropHtml} <div class="search__drop-item">${el.country}</div>`;
      }
      return dropHtml;
    }, '');
    finalHtml = finalHtml.length ? finalHtml : '<div class="search__drop-item search__drop-item_noresult">No results</div>';
    return finalHtml;
  }

  initCloseIcon() {
    this.close.addEventListener('click', () => {
      this.hideDrop();
    });
  }

  initCountryChooseInDrop() {
    this.drop.addEventListener('click', (e) => {
      if (e.target.classList.toString() === 'search__drop-item') {
        const clickedCountry = e.target.innerHTML;
        const countryFromStats = countries.stats.find((el) => el.country === clickedCountry);
        dom.t1country.dataset.mode = 'country';
        showCountryStatsTable1(countryFromStats);
        this.hideDrop();
      }
    });
  }

  closeDropOnClickOutside() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.table1 .search')) {
        this.hideDrop();
      }
    });
  }

  hideDrop() {
    this.drop.classList.remove('search__drop_active');
    this.close.classList.remove('search__close_active');
    this.input.value = '';
  }
}
