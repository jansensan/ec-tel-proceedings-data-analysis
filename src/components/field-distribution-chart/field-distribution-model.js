import _ from 'lodash';

// constants
import ChartColors from '../../constants/chart-colors';


class FieldDistributionModel {
  constructor() {
    this.data = {
      labels: ['Engineering', 'Social Sciences'],
      datasets: [
        {
          label: ['Field distribution chart'],
          backgroundColor: [ChartColors.RED_TRANSPARENT, ChartColors.BLUE_TRANSPARENT],
          borderColor: [ChartColors.RED, ChartColors.BLUE],
          borderWidth: 1,
          hoverBackgroundColor: [ChartColors.RED, ChartColors.BLUE],
          hoverBorderColor: [ChartColors.RED, ChartColors.BLUE],
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

  updateData(newValue) {
    // TODO: ensure it's array
    // TODO: ensure it's array with length of 2
    this.data.datasets[0].data = newValue;
  }
}


// create and export singleton
let fieldDistModel = new FieldDistributionModel();
export default fieldDistModel;
