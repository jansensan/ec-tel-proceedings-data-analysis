// services
import DatasetFactory from '../../services/dataset-factory';


class GenderDistPerFieldModel {
  constructor() {
    this.data = {
      labels: ['2018', '2017', '2016'],
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

  getTooltipLabel(tooltipItem, data) {
    let val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
    let year = data.datasets[tooltipItem.datasetIndex].label;
    let label = _.round(val, 1) + '%'
      + ' (' + year + ')'

    return label;
  }

  updateData(newData) {
    // set labels
    this.data.labels = [
      'Women in Engineering',
      'Men in Engineering',
      'Women in Social Sciences',
      'Men in Social Sciences',
    ];

    // set data

    // 2018
    this.data.datasets[0].data = [
      newData[2018].eng.f * 100,
      newData[2018].eng.m * 100,
      newData[2018].soc.f * 100,
      newData[2018].eng.m * 100,
    ];

    // 2017
    this.data.datasets[1].data = [
      newData[2017].eng.f * 100,
      newData[2017].eng.m * 100,
      newData[2017].soc.f * 100,
      newData[2017].eng.m * 100,
    ];

    // 2016
    this.data.datasets[2].data = [
      newData[2016].eng.f * 100,
      newData[2016].eng.m * 100,
      newData[2016].soc.f * 100,
      newData[2016].eng.m * 100,
    ];
  }
}


// create and export singleton
let genderDistPerFieldModel = new GenderDistPerFieldModel();
export default genderDistPerFieldModel;
