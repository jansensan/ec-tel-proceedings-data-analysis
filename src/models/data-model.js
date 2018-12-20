import signals from 'signals';

import DataService from '../services/data-service';


class DataModel {
  constructor() {
    this.data = [
      {
        year: 2016,
        datasetURL: 'data/ec-tel-2016.json',
        data: []
      },
      {
        year: 2017,
        datasetURL: 'data/ec-tel-2017.json',
        data: []
      },
      {
        year: 2018,
        datasetURL: 'data/ec-tel-2018.json',
        data: []
      }
    ];
    this.updated = new signals.Signal();
  }

  fetch(year) {
    // TODO: return data if already fetched
    return DataService.fetch(this.getDatasetURLForYear(year))
      .then((response) => {
        this.setDataForYear(year, response.papers);
        this.updated.dispatch();
      });
  }

  getIndexForYear(year) {
    let dataIndex = -1;
    switch (year) {
      case 2016:
        dataIndex = 0;
        break;

      case 2017:
        dataIndex = 1;
        break;

      case 2018:
        dataIndex = 2;
        break;

      default:
        console.warn(
          'Error at DataModel.getIndexForYear: '
          + 'Invalid year ("' + year + '") for data.'
        );
        break;
    }
    return dataIndex;
  }

  getDataForYear(year) {
    return this.data[this.getIndexForYear(year)].data;
  }

  getDatasetURLForYear(year) {
    return this.data[this.getIndexForYear(year)].datasetURL;
  }

  hasData() {
    return this.getDataForYear(2017).length > 0;
  }

  setDataForYear(year, newData) {
    this.data[this.getIndexForYear(year)].data = newData;
  }
}


// create and export singleton
let dataModel = new DataModel();
export default dataModel;
