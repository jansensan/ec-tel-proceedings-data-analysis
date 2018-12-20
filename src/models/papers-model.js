import _ from 'lodash';

// services
import Log from '../services/log';

// models
import dataModel from './data-model';


class PapersModel {
  constructor() {
  }

  getPapers(year) {
    let papers = dataModel.getDataForYear(year);
    if (papers) {
      papers = _.sortBy(papers, 'title');
    } else {
      papers = [];
    }

    return papers;
  }

  getNumPapers(year) {
    return this.getPapers(year).length
  }

  getNumPapersWithWomenAsFirstAuthor(year) {
    let papers = this.getPapers(year);
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

  getNumPapersWithOnlyMenAuthors(year) {
    let papers = this.getPapers(year);
    let sum = 0;

    _.forEach(
      papers,
      (paper) => {

        let femaleAuthors = _.filter(
          paper.authors,
          (author) => {
            return author.gender === 'm';
          }
        );
        if (femaleAuthors.length === paper.authors.length) {
          sum++;
        }

      }
    );
    return sum;
  }

  getNumPapersWithOnlyWomenAuthors(year) {
    let papers = this.getPapers(year);
    let sum = 0;

    _.forEach(
      papers,
      (paper) => {

        let femaleAuthors = _.filter(
          paper.authors,
          (author) => {
            return author.gender === 'f';
          }
        );
        if (femaleAuthors.length === paper.authors.length) {
          sum++;
        }

      }
    );
    return sum;
  }

  getWomenMeanRepresentation(year) {
    let papers = this.getPapers(year);
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
