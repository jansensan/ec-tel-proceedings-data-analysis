import _ from 'lodash';
import signals from 'signals';

// services
import Log from '../services/log';

// models
import dataModel from './data-model';


class AuthorsModel {
  constructor() {
    this.authors = {
      2016: [],
      2017: [],
      2018: []
    };
    this.updated = new signals.Signal();

    dataModel.updated.add(this.onDataUpdated, this);
  }

  getCountryDistribution(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getCountryDistribution',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // loop through authors
    let countries = [];
    _.forEach(
      this.authors[year],
      (author) => {
        countries.push(author.country);
      }
    );

    // sort by name
    countries = _.sortBy(countries);

    // create dist
    let uniqueCountries = this.getUniqueCountries(year);
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

  getFieldDistribution(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getFieldDistribution',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    let eng = _.filter(
      authors,
      (author) => {return author.field === 'eng'}
    );
    let soc = _.filter(
      authors,
      (author) => {return author.field === 'soc'}
    );

    return {
      'eng': eng.length / authors.length,
      'soc': soc.length / authors.length
    };
  }

  getGenderDistribution(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getGenderDistribution',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    return {
      'f': this.getFemaleAuthors(year).length / authors.length,
      'm': this.getMaleAuthors(year).length / authors.length
    };
  }

  getGenderDistPerField(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getGenderDistPerField',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    let eng = _.filter(
      authors,
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
      authors,
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

  getFemaleAuthors(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getFemaleAuthors',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    return _.filter(
      authors,
      (author) => {return author.gender === 'f'}
    );
  }

  getMaleAuthors(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getMaleAuthors',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    return _.filter(
      authors,
      (author) => {return author.gender === 'm'}
    );
  }

  getNumAuthors(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getNumAuthors',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    return this.authors[year].length;
  }

  getUniqueCountries(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getUniqueCountries',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let countries = [];

    // loop through authors
    let authors = this.authors[year]
    _.forEach(
      authors,
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

  getUniqueUniversities(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getUniqueUniversities',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // sort data
    let unis = [];

    // loop through authors
    let authors = this.authors[year];
    _.forEach(
      authors,
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

  getUniversityCountry(uni, year) {
    // error check
    if (_.isUndefined(uni)) {
      Log.error(
        'AuthorsModel', 'getUniversityCountry',
        'Expecting a `uni` (string) as a first parameter.'
      );
    }
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getUniversityCountry',
        'Expecting a `year` (number) as a second parameter.'
      );
    }

    // sort data
    let authors = this.authors[year];
    let sameUni = _.filter(
      authors,
      (author) => {
        return author.uni === uni;
      }
    );

    return sameUni[0].country;
  }

  getUniversityDistribution(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'getUniversityDistribution',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // loop through authors
    let authors = this.authors[year];
    let unis = [];
    _.forEach(
      authors,
      (author) => {
        unis.push(author.uni);
      }
    );

    // sort by name
    unis = _.sortBy(unis);

    // create dist
    let uniqueUnis = this.getUniqueUniversities(year);
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

        dist.push({
          name: u + ' (' + this.getUniversityCountry(u, year) + ')',
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

  onDataUpdated() {
    this.authors[2016] = this.parseAuthors(2016);
    this.authors[2017] = this.parseAuthors(2017);
    this.authors[2018] = this.parseAuthors(2018);

    this.updated.dispatch();
  }

  parseAuthors(year) {
    // error check
    if (_.isUndefined(year)) {
      Log.error(
        'AuthorsModel', 'parseAuthors',
        'Expecting a `year` (number) as a parameter.'
      );
    }

    // init
    let authors = [];

    // loop through papers
    _.forEach(
      dataModel.getDataForYear(year),
      (paper) => {

        // extract authors
        _.forEach(
          paper.authors,
          (author) => {
            authors.push(author);
          }
        );

      }
    );

    // remove duplicates
    authors = _.uniqBy(authors, 'name');

    // sort by name
    authors = _.sortBy(authors, 'name');

    return authors;
  }
}


// create and export singleton
let authorsModel = new AuthorsModel();
export default authorsModel;
