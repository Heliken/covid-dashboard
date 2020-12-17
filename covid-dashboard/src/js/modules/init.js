// app first start

import insertAppTemplate from './insertAppTemplate.js';
import addImages from './addImages.js';
import Table1 from './Table1.js';

export default () => {
  insertAppTemplate();
  addImages();
  const appTable1 = new Table1();
  console.log(appTable1.worldStats);
};
