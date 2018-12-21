import _ from 'lodash';

// constants
import ChartColors from '../../constants/chart-colors';

// services
import DatasetFactory from '../../services/dataset-factory';


class CountryDistributionModel {
  constructor() {
    this.data = {
      labels: [],
      datasets: [
        DatasetFactory.createGreenDataset('2018'),
        DatasetFactory.createBlueDataset('2017'),
      ]
    };
    this.options = {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return _.round(val, 1) + '%';
          }
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

  updateData(newData) {
    // loop through each year
    // to extract a list of unique countries
    let countries = [];
    _.forEach(
      newData,
      (year) => {

        // loop through each country
        _.forEach(
          year,
          (country) => {
            countries.push(country.name);
          }
        );

      }
    );
    
    // remove duplicates
    countries = _.uniq(countries);

    // loop through unique countries
    let dist = {};
    _.forEach(
      countries,
      (countryName) => {
        let array2017 = _.filter(newData[2017], {name: countryName});
        let value2017 = (array2017.length) ? array2017[0].numAuthors : 0;
        let array2018 = _.filter(newData[2018], {name: countryName});
        let value2018 = (array2018.length) ? array2018[0].numAuthors : 0;

        dist[countryName] = {
          name: countryName,
          2017: value2017,
          2018: value2018,
        };
      }
    );

    dist = _.sortBy(dist, 2018, 'desc');
    dist = _.reverse(dist);

    // set labels
    let labels = [];
    let values2017 = [];
    let values2018 = [];
    _.forEach(
      dist,
      (country) => {
        labels.push(country.name);
        values2017.push(country[2017]);
        values2018.push(country[2018]);
      }
    );

    // set labels
    this.data.labels = labels;

    // set data
    this.data.datasets[0].data = values2018;
    this.data.datasets[1].data = values2017;
  }
}


// create and export singleton
let countryDistModel = new CountryDistributionModel();
export default countryDistModel;
