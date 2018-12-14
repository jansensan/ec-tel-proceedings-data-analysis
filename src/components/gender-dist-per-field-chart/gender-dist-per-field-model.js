// constants
import ChartColors from '../../constants/chart-colors';


class GenderDistPerFieldModel {
  constructor() {
    this.data = {
      labels: ['Engineering', 'Social Sciences'],
      datasets: [
        {
          label: 'Women',
          backgroundColor: [ChartColors.ORANGE_TRANSPARENT, ChartColors.ORANGE_TRANSPARENT],
          borderColor: [ChartColors.ORANGE, ChartColors.ORANGE],
          borderWidth: 1,
          hoverBackgroundColor: [ChartColors.ORANGE, ChartColors.ORANGE],
          hoverBorderColor: [ChartColors.ORANGE, ChartColors.ORANGE],
          data: []
        },
        {
          label: 'Men',
          backgroundColor: [ChartColors.GREEN_TRANSPARENT, ChartColors.GREEN_TRANSPARENT],
          borderColor: [ChartColors.GREEN, ChartColors.GREEN],
          borderWidth: 1,
          hoverBackgroundColor: [ChartColors.GREEN, ChartColors.GREEN],
          hoverBorderColor: [ChartColors.GREEN, ChartColors.GREEN],
          data: []
        }
      ]
    };
    this.options = {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let gender = data.datasets[tooltipItem.datasetIndex].label
            let val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return gender + ': ' + _.round(val, 1) + '%';
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

  updateData(engDist, socDist) {
    // TODO: ensure it's array
    // TODO: ensure it's array with length of 2
    this.data.datasets[0].data = engDist;
    this.data.datasets[1].data = socDist;
  }
}


// create and export singleton
let genderDistPerFieldModel = new GenderDistPerFieldModel();
export default genderDistPerFieldModel;
