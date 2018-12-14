import _ from 'lodash';

// constants
import ChartColors from '../../constants/chart-colors';


class UniDistributionModel {
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
            let label = val + ' author';
            if (val > 1) {
              label += 's';
            }
            return label;
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
            labelString: 'num. of authors'
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
let uniDistModel = new UniDistributionModel();
export default uniDistModel;
