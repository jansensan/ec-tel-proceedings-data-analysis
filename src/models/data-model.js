import _ from 'lodash';
import signals from 'signals';

// services
import Log from '../services/log';
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
    if (_.isUndefined(year)) {
      Log.error(
        'DataModel', 'fetch',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    return DataService.fetch(this.getDatasetURLForYear(year))
      .then((response) => {
        this.setDataForYear(year, response.papers);
        this.updated.dispatch();
      });
  }

  getIndexForYear(year) {
    if (_.isUndefined(year)) {
      Log.error(
        'DataModel', 'getIndexForYear',
        'Expecting a `year` (number) as a parameter.'
      );
    }

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
    }
    return dataIndex;
  }

  getDataForYear(year) {
    if (_.isUndefined(year)) {
      Log.error(
        'DataModel', 'getDataForYear',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    return this.data[this.getIndexForYear(year)].data;
  }

  getDatasetURLForYear(year) {
    if (_.isUndefined(year)) {
      Log.error(
        'DataModel', 'getDatasetURLForYear',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    return this.data[this.getIndexForYear(year)].datasetURL;
  }

  hasData() {
    let has2016Data = (this.getDataForYear(2016).length > 0);
    let has2017Data = (this.getDataForYear(2017).length > 0);
    let has2018Data = (this.getDataForYear(2018).length > 0);

    return has2016Data && has2017Data && has2018Data;
  }

  setDataForYear(year, newData) {
    if (_.isUndefined(year)) {
      Log.error(
        'DataModel', 'setDataForYear',
        'Expecting a `year` (number) as a parameter.'
      );
    }
    if (_.isUndefined(newData)) {
      Log.error(
        'DataModel', 'setDataForYear',
        'Expecting a `newData` (object) as a parameter.'
      );
    }

    this.data[this.getIndexForYear(year)].data = newData;
  }
}


// create and export singleton
let dataModel = new DataModel();
export default dataModel;
