import ChartColors from '../constants/chart-colors';


// public api
let DatasetFactory = {
  createBlueDataset: createBlueDataset,
  createGreenDataset: createGreenDataset,
  createOrangeDataset: createOrangeDataset,
  createRedDataset: createRedDataset,
};
export default DatasetFactory;


// public methods definitions
function createBlueDataset(label) {
  return {
    label: label,
    backgroundColor: ChartColors.BLUE_TRANSPARENT,
    borderColor: ChartColors.BLUE,
    borderWidth: 1,
    hoverBackgroundColor: ChartColors.BLUE,
    hoverBorderColor: ChartColors.BLUE,
    data: []
  };
}

function createGreenDataset(label) {
  return {
    label: label,
    backgroundColor: ChartColors.GREEN_TRANSPARENT,
    borderColor: ChartColors.GREEN,
    borderWidth: 1,
    hoverBackgroundColor: ChartColors.GREEN,
    hoverBorderColor: ChartColors.GREEN,
    data: []
  };
}

function createOrangeDataset(label) {
  return {
    label: label,
    backgroundColor: ChartColors.ORANGE_TRANSPARENT,
    borderColor: ChartColors.ORANGE,
    borderWidth: 1,
    hoverBackgroundColor: ChartColors.ORANGE,
    hoverBorderColor: ChartColors.ORANGE,
    data: []
  };
}

function createRedDataset(label) {
  return {
    label: label,
    backgroundColor: ChartColors.RED_TRANSPARENT,
    borderColor: ChartColors.RED,
    borderWidth: 1,
    hoverBackgroundColor: ChartColors.RED,
    hoverBorderColor: ChartColors.RED,
    data: []
  };
}
