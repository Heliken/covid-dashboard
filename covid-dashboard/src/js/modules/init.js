import insertAppTemplate from './insertAppTemplate.js';
import addImages from './addImages.js';
import Table1 from './Table1.js';
import chartBlock from './chartBlock.js';

export default () => {
  insertAppTemplate();
  addImages();
  chartBlock.init();
  const appTable1 = new Table1();
};
