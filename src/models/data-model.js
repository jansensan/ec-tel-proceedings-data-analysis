import signals from 'signals';

import DataService from '../services/data-service';


class DataModel {
  constructor() {
    this.data = [];
    this.updated = new signals.Signal();
  }

  fetch() {
    // TODO: return data if already fetched
    return DataService.fetch()
      .then((response) => {
        this.data = response.papers;
        this.updated.dispatch();
      });
  }
}


// create and export singleton
let dataModel = new DataModel();
export default dataModel;
