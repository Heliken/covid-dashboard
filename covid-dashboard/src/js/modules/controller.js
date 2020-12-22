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
    this.updateBlockParams(countriesList);
    this.updateBlockParams(chartBlock);
  },
  updateBlockParams(block) {
    this.updateParamsValues(block);
    this.updateSwitchBlock(block);
    block.updateParams(this.dataParams);
  },
  updateParamsValues(block) {
    const blockEntity = block;
    blockEntity.dataType = this.dataParams.dataType;
    blockEntity.currentPeriod = this.dataParams.currentPeriod;
    blockEntity.currentQuantity = this.dataParams.currentQuantity;
    blockEntity.showingWorldStats = this.dataParams.showingWorldStats;
  },
  updateSwitchBlock(block) {
    const blockEntity = block;
    blockEntity.switchBlock.dataSelect.value = this.dataParams.dataType;
    this.checkNeededRadio(blockEntity.switchBlock.quantityInput, this.dataParams.currentQuantity);
    this.checkNeededRadio(blockEntity.switchBlock.periodInput, this.dataParams.currentPeriod);
  },
  checkNeededRadio(radiobuttons, value) {
    radiobuttons.forEach((item) => {
      const element = item;
      if (element.value === value) {
        element.checked = true;
      }
    });
  },
};
