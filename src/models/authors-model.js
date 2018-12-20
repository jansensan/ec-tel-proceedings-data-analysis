import _ from 'lodash';
import signals from 'signals';

import dataModel from './data-model';


class AuthorsModel {
  constructor() {
    this.authors = [];
    this.updated = new signals.Signal();

    dataModel.updated.add(this.onDataUpdated, this);
  }

  getCountryDistribution() {
    // loop through authors
    let countries = [];
    _.forEach(
      this.authors,
      (author) => {
        countries.push(author.country);
      }
    );

    // sort by name
    countries = _.sortBy(countries);

    // create dist
    let uniqueCountries = this.getUniqueCountries();
    let dist = [];
    _.forEach(
      uniqueCountries,
      (c) => {
        let sameCountry = _.filter(
          countries,
          (name) => {
            return name === c;
          }
        );
        dist.push({
          name: c,
          numAuthors: (sameCountry.length / countries.length) * 100
        });
      }
    );

    // sort by num of authors
    dist = _.sortBy(dist, 'numAuthors');

    // reverse to get biggest to smallest
    dist = _.reverse(dist);

    return dist;
  }

  getFieldDistribution() {
    let eng = _.filter(
      this.authors,
      (author) => {return author.field === 'eng'}
    );
    let soc = _.filter(
      this.authors,
      (author) => {return author.field === 'soc'}
    );
    return {
      'eng': eng.length / this.authors.length,
      'soc': soc.length / this.authors.length
    };
  }

  getGenderDistribution() {
    return {
      'f': this.getFemaleAuthors().length / this.authors.length,
      'm': this.getMaleAuthors().length / this.authors.length
    };
  }

  getGenderDistPerField() {
    let eng = _.filter(
      this.authors,
      (author) => {return author.field === 'eng'}
    );
    let engF = _.filter(
      eng,
      (author) => {return author.gender === 'f'}
    );
    let engM = _.filter(
      eng,
      (author) => {return author.gender === 'm'}
    );

    let soc = _.filter(
      this.authors,
      (author) => {return author.field === 'soc'}
    );
    let socF = _.filter(
      soc,
      (author) => {return author.gender === 'f'}
    );
    let socM = _.filter(
      soc,
      (author) => {return author.gender === 'm'}
    );

    return {
      eng: {
        f: engF.length / eng.length,
        m: engM.length / eng.length
      },
      soc: {
        f: socF.length / soc.length,
        m: socM.length / soc.length,
      },
    }
  }

  getFemaleAuthors() {
    return _.filter(
      this.authors,
      (author) => {return author.gender === 'f'}
    );
  }

  getMaleAuthors() {
    return _.filter(
      this.authors,
      (author) => {return author.gender === 'm'}
    );
  }

  getUniqueCountries() {
    let countries = [];

    // loop through authors
    _.forEach(
      this.authors,
      (author) => {
        countries.push(author.country);
      }
    );

    // remove duplicates
    countries = _.uniqBy(countries);

    // sort by name
    countries = _.sortBy(countries);

    return countries;
  }

  getUniqueUniversities() {
    let unis = [];

    // loop through authors
    _.forEach(
      this.authors,
      (author) => {
        unis.push(author.uni);
      }
    );

    // remove duplicates
    unis = _.uniqBy(unis);

    // sort by name
    unis = _.sortBy(unis);

    return unis;
  }

  getUniversityCountry(uni) {
    let sameUni = _.filter(
      this.authors,
      (author) => {
        return author.uni === uni;
      }
    );

    return sameUni[0].country;
  }

  getUniversityDistribution() {
    // loop through authors
    let unis = [];
    _.forEach(
      this.authors,
      (author) => {
        unis.push(author.uni);
      }
    );

    // sort by name
    unis = _.sortBy(unis);

    // create dist
    let uniqueUnis = this.getUniqueUniversities();
    let dist = [];
    _.forEach(
      uniqueUnis,
      (u) => {
        let sameUni = _.filter(
          unis,
          (name) => {
            return name === u;
          }
        );
        
        this.getUniversityCountry(u);
        dist.push({
          name: u + ' (' + this.getUniversityCountry(u) + ')',
          numAuthors: sameUni.length
        });
      }
    );

    // sort by num of authors
    dist = _.sortBy(dist, 'numAuthors');

    // reverse to get biggest to smallest
    dist = _.reverse(dist);

    return dist;
  }

  logGenderDistribution() {
    console.log('num authors: ' + this.authors.length);

    let f = this.getFemaleAuthors();
    console.log('num females:' + f.length);

    let m = this.getMaleAuthors();
    console.log('num males:' + m.length);
  }

  onDataUpdated() {
    this.parseAuthors();
    this.updated.dispatch();
  }

  parseAuthors() {
    // memory management
    this.authors.length = 0;
    this.authors = null;

    // init
    this.authors = [];

    // loop through papers
    _.forEach(
      dataModel.getDataForYear(2017),
      (paper) => {
        
        // extract authors
        _.forEach(
          paper.authors,
          (author) => {
            this.authors.push(author);
          }
        );

      }
    );

    // remove duplicates
    this.authors = _.uniqBy(this.authors, 'name');

    // sort by name
    this.authors = _.sortBy(this.authors, 'name');
  }
}


// create and export singleton
let authorsModel = new AuthorsModel();
export default authorsModel;
