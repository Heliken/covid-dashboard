// app first start

import insertAppTemplate from './insertAppTemplate.js';
import addImages from './addImages.js';
import Table1 from './Table1.js';
import countries from './countries.js';

export default () => {
  insertAppTemplate();
  addImages();
  const appTable1 = new Table1();
  appTable1.init();
  countries.loadStats();
};
