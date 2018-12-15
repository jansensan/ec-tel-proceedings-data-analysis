// constants
import ChartColors from '../../constants/chart-colors';


class GenderDiversityModel {
  constructor() {
    this.data = {
      labels: ['Only Women', 'Only Men', 'Mixed Gender'],
      datasets: [
        {
          label: 'Gender diversity chart',
          backgroundColor: [ChartColors.GREEN_TRANSPARENT, ChartColors.ORANGE_TRANSPARENT, ChartColors.BLUE_TRANSPARENT],
          borderColor: [ChartColors.GREEN, ChartColors.ORANGE, ChartColors.BLUE],
          borderWidth: 1,
          hoverBackgroundColor: [ChartColors.GREEN, ChartColors.ORANGE, ChartColors.BLUE],
          hoverBorderColor: [ChartColors.GREEN, ChartColors.ORANGE, ChartColors.BLUE],
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
            labelString: 'papers (%)'
          }
        }]
      },
      maintainAspectRatio: false
    }
  }

  updateData(newValues) {
    // TODO: ensure it's array
    // TODO: ensure it's array with length of 2
    this.data.datasets[0].data = newValues;
  }
}


// create and export singleton
let genderDiversityModel = new GenderDiversityModel();
export default genderDiversityModel;
