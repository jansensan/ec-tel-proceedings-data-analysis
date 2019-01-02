import _ from 'lodash';

// services
import DatasetFactory from '../../services/dataset-factory';


class UniDistributionModel {
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
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'num. of authors'
          }
        }]
      },
      maintainAspectRatio: false
    }
  }

  getTooltipLabel(tooltipItem, data) {
    let tooltipData = data.datasets[tooltipItem.datasetIndex].data;
    let val = tooltipData[tooltipItem.index];
    let label = val + ' author';
    if (val > 1) {
      label += 's';
    }
    label += ' (' + this.data.datasets[tooltipItem.datasetIndex].label + ')'
    return label;
  }

  updateData(newData) {
    // loop through each year
    // to extract a list of unique universities
    let unis = []
    _.forEach(
      newData,
      (year) => {

        // loop through each uni
        _.forEach(
          year,
          (uni) => {
            unis.push(uni.name);
          }
        );

      }
    );

    // remove duplicates
    unis = _.uniq(unis);

     // loop through unique uni
     let dist = {};
     _.forEach(
      unis,
      (uniName) => {
        let array2016 = _.filter(newData[2016], {name: uniName});
        let value2016 = (array2016.length) ? array2016[0].numAuthors : 0;

        let array2017 = _.filter(newData[2017], {name: uniName});
        let value2017 = (array2017.length) ? array2017[0].numAuthors : 0;

        let array2018 = _.filter(newData[2018], {name: uniName});
        let value2018 = (array2018.length) ? array2018[0].numAuthors : 0;

        dist[uniName] = {
          name: uniName,
          2016: value2016,
          2017: value2017,
          2018: value2018,
          sum: value2016 + value2017 + value2018
        };
      }
    );

    dist = _.sortBy(dist, 'sum', 'desc');
    dist = _.reverse(dist);

    // set labels
    let labels = [];
    let values2016 = [];
    let values2017 = [];
    let values2018 = [];
    _.forEach(
      dist,
      (country) => {
        labels.push(country.name);
        values2016.push(country[2016]);
        values2017.push(country[2017]);
        values2018.push(country[2018]);
      }
    );

    // set labels
    this.data.labels = labels;

    // set data
    this.data.datasets[0].data = values2018;
    this.data.datasets[1].data = values2017;
    this.data.datasets[2].data = values2016;
  }
}


// create and export singleton
let uniDistModel = new UniDistributionModel();
export default uniDistModel;
