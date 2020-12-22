import countriesList from './countriesList';
import chartBlock from './chartBlock';

export default {
  dataParams: {
    dataType: 'cases',
    currentPeriod: 'all',
    currentQuantity: 'absolute',
    country: null,
    showingWorldStats: true,
  },
  updateParameters(paramsArray) {
    paramsArray.forEach((item) => {
      const [type, value] = item;
      this.dataParams[type] = value;
    });
    this.syncBlocks();
  },
  syncBlocks() {
    countriesList.updateParams(this.dataParams);
    chartBlock.updateParams(this.dataParams);
  },
};
