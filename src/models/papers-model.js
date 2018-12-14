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

  getNumPapersWithWomenAsFirstAuthor() {
    let papers = this.getPapers();
    let sum = 0;
    _.forEach(
      papers,
      (paper) => {
        if (paper.authors[0].gender === 'f') {
          sum++;
        }
      }
    );
    return sum;
  }

  getWomenMeanRepresentation() {
    let papers = this.getPapers();
    let means = [];
    _.forEach(
      papers,
      (paper) => {
        let numAuthors = paper.authors.length;
        let womenAuthors = _.filter(
          paper.authors,
          (author) => {
            return author.gender === 'f'
          }
        );
        means.push(womenAuthors.length / numAuthors);
      }
    );
    return _.sum(means) / papers.length;
  }
}


// create and export singleton
let papersModel = new PapersModel();
export default papersModel;
