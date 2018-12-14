import _ from 'lodash';

import dataModel from './data-model';


class PapersModel {
  constructor() {
  }

  getPapers() {
    let papers = dataModel.data;
    if (papers) {
      papers = _.sortBy(papers, 'title');
    } else {
      papers = [];
    }

    return papers;
  }
}


// create and export singleton
let papersModel = new PapersModel();
export default papersModel;
