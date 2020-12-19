import './styles/index.scss';
import '@babel/polyfill';
import insertAppTemplate from './js/modules/insertAppTemplate.js';
import addImages from './js/modules/addImages.js';
import Table1 from './js/modules/Table1.js';
import SearchCountries from './js/modules/SearchCountries.js';
import countries from './js/modules/countries.js';
import dom from './js/modules/dom.js';

insertAppTemplate();
addImages();
dom.setElements();
const appTable1 = new Table1();
appTable1.init();
countries.loadStats();
const table1Search = new SearchCountries();
table1Search.init();
