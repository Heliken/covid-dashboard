import './styles/index.scss';
import '@babel/polyfill';
import insertAppTemplate from './js/modules/insertAppTemplate.js';
import addImages from './js/modules/addImages.js';
import Table1 from './js/modules/Table1.js';
import chartBlock from './js/modules/chartBlock.js';

insertAppTemplate();
addImages();
chartBlock.init();
const appTable1 = new Table1();
