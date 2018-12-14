// constants
import ChartColors from '../../constants/chart-colors';


class GenderDistributionModel {
  constructor() {
    this.data = {
      labels: ['Women', 'Men'],
      datasets: [
        {
          label: 'Gender distribution chart',
          backgroundColor: [ChartColors.GREEN_TRANSPARENT, ChartColors.ORANGE_TRANSPARENT],
          borderColor: [ChartColors.GREEN, ChartColors.ORANGE],
          borderWidth: 1,
          hoverBackgroundColor: [ChartColors.GREEN, ChartColors.ORANGE],
          hoverBorderColor: [ChartColors.GREEN, ChartColors.ORANGE],
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
let genderDistModel = new GenderDistributionModel();
export default genderDistModel;
