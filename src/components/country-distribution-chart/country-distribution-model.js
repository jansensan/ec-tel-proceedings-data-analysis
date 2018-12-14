import _ from 'lodash';

// constants
import ChartColors from '../../constants/chart-colors';


class CountryDistributionModel {
  constructor() {
    this.data = {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: ChartColors.BLUE_TRANSPARENT,
          borderColor: ChartColors.BLUE,
          borderWidth: 1,
          hoverBackgroundColor: ChartColors.BLUE,
          hoverBorderColor: ChartColors.BLUE,
          data: []
        }
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
      legend: {
        display: false
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
    let labels = [];
    let values = [];

    _.forEach(
      newData,
      (country) => {
        labels.push(country.name);
        values.push(country.numAuthors);
      }
    );

    // set labels
    this.data.labels = labels;

    // set data
    this.data.datasets[0].data = values;
  }
}


// create and export singleton
let countryDistModel = new CountryDistributionModel();
export default countryDistModel;
