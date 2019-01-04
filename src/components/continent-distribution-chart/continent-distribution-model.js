import _ from 'lodash';

// constants
import Continents from '../../constants/continents';

// services
import DatasetFactory from '../../services/dataset-factory';
import CountryService from '../../services/country-service';

// models
import authorsModel from '../../models/authors-model';


class ContinentDistributionModel {
  constructor() {
    this.data = {
      labels: [],
      datasets: [
        DatasetFactory.createOrangeDataset('2018'),
        DatasetFactory.createBlueDataset('2017'),
        DatasetFactory.createGreenDataset('2016'),
      ]
    };
    this.options = {
      tooltips: {
        callbacks: {
          label: this.getTooltipLabel.bind(this)
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'authors (%)'
          }
        }]
      },
      maintainAspectRatio: false
    }
  }

  createContinentValueObject() {
    let vo = {};
    _.forEach(
      Continents,
      (continent) => {
        vo[continent.id] = {
          id: continent.id,
          name: CountryService.getContinentNameWithId(continent.id),
          numAuthors: 0,
        };
      }
    );
    return vo;
  }

  getContinentsLabels() {
    let labels = [];
    _.forEach(
      Continents,
      (continent) => {
        labels.push(continent.name);
      }
    );
    return labels;
  }

  getCSV() {
    let sep = '\t';
    let rows = ['continent', '2018', '2017', '2016'];
    let csvContent = 'data:text/csv;charset=utf-8,'
      + rows.join(sep) + '\n';

    let numContinents = 6;
    for (let i = 0; i < numContinents; i++) {
      let row = this.data.labels[i]
        // 2018
        + sep + this.data.datasets[0].data[i]
        // 2017
        + sep + this.data.datasets[1].data[i]
        // 2016
        + sep + this.data.datasets[2].data[i];
      csvContent += row + '\n';
    }

    return csvContent;
  }

  getTooltipLabel(tooltipItem) {
    let dataset = this.data.datasets[tooltipItem.datasetIndex];
    let val = dataset.data[tooltipItem.index];
    let label = _.round(val, 1) + '%'
      + ' (' + dataset.label + ')';
    return label;
  }

  updateData(newData) {
    // create continents data
    let continents = {
      2016: this.createContinentValueObject(),
      2017: this.createContinentValueObject(),
      2018: this.createContinentValueObject(),
    };

    // parse data
    _.forEach(
      newData[2016],
      (country) => {
        let continentId = CountryService.getContinentIdWithCountryCode(country.name);
        continents[2016][continentId].numAuthors += country.numAuthors;
      }
    );
    _.forEach(
      newData[2017],
      (country) => {
        let continentId = CountryService.getContinentIdWithCountryCode(country.name);
        continents[2017][continentId].numAuthors += country.numAuthors;
      }
    );
    _.forEach(
      newData[2018],
      (country) => {
        let continentId = CountryService.getContinentIdWithCountryCode(country.name);
        continents[2018][continentId].numAuthors += country.numAuthors;
      }
    );

    let numAuthors = 0;

    // assign distribution 2016
    numAuthors = authorsModel.getNumAuthors(2016);
    let values2016 = [];
    _.forEach(
      continents[2016],
      (continent) => {
        values2016.push((continent.numAuthors / numAuthors) * 100);
      }
    );

    // assign distribution 2017
    numAuthors = authorsModel.getNumAuthors(2017);
    let values2017 = [];
    _.forEach(
      continents[2017],
      (continent) => {
        values2017.push((continent.numAuthors / numAuthors) * 100);
      }
    );

    // assign distribution 2018
    numAuthors = authorsModel.getNumAuthors(2018);
    let values2018 = [];
    _.forEach(
      continents[2018],
      (continent) => {
        values2018.push((continent.numAuthors / numAuthors) * 100);
      }
    );

    // set labels
    this.data.labels = this.getContinentsLabels();

    // set data
    this.data.datasets[0].data = values2018;
    this.data.datasets[1].data = values2017;
    this.data.datasets[2].data = values2016;
  }
}


// create and export singleton
let continentDistModel = new ContinentDistributionModel();
export default continentDistModel;
