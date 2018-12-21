// services
import DatasetFactory from '../../services/dataset-factory';


class GenderDistributionModel {
  constructor() {
    
    this.data = {
      labels: ['2018', '2017'],
      datasets: [
        DatasetFactory.createGreenDataset('2018'),
        DatasetFactory.createBlueDataset('2017'),
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

  getTooltipLabel(tooltipItem, data) {
    let tooltipData = data.datasets[tooltipItem.datasetIndex].data;
    let val = tooltipData[tooltipItem.index];
    let label = _.round(val, 1) + '%'
      + ' (' + this.data.datasets[tooltipItem.datasetIndex].label + ')'

    return label;
  }

  updateData(newData) {
    // set labels
    this.data.labels = ['Women', 'Men'];

    // set data

    // 2018
    this.data.datasets[0].data = [
      newData[2018].f * 100,
      newData[2018].m * 100,
    ];
    
    // 2017
    this.data.datasets[1].data = [
      newData[2017].f * 100,
      newData[2017].m * 100,
    ];
  }
}


// create and export singleton
let genderDistModel = new GenderDistributionModel();
export default genderDistModel;
