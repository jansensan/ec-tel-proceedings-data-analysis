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

  getCSV() {
    let sep = '\t';
    let rows = ['field', 'gender', '2018', '2017', '2016'];
    let csvContent = 'data:text/csv;charset=utf-8,'
      + rows.join(sep) + '\n';

    // women in engineering row
    let womenEngRow = 'engineering'
      // gender
      + sep + 'women'
      // 2018
      + sep + this.data.datasets[0].data[0]
      // 2017
      + sep + this.data.datasets[1].data[0]
      // 2016
      + sep + this.data.datasets[2].data[0];
    csvContent += womenEngRow + '\n';

    // men in engineering row
    let menEngRow = 'engineering'
      // gender
      + sep + 'men'
      // 2018
      + sep + this.data.datasets[0].data[1]
      // 2017
      + sep + this.data.datasets[1].data[1]
      // 2016
      + sep + this.data.datasets[2].data[1];
    csvContent += menEngRow + '\n';

    // women in social sciences row
    let womenSocRow = 'social sciences'
      // gender
      + sep + 'women'
      // 2018
      + sep + this.data.datasets[0].data[2]
      // 2017
      + sep + this.data.datasets[1].data[2]
      // 2016
      + sep + this.data.datasets[2].data[2];
    csvContent += womenSocRow + '\n';

    // men in social sciences row
    let menSocRow = 'social sciences'
      // gender
      + sep + 'men'
      // 2018
      + sep + this.data.datasets[0].data[3]
      // 2017
      + sep + this.data.datasets[1].data[3]
      // 2016
      + sep + this.data.datasets[2].data[3];
    csvContent += menSocRow + '\n';

    return csvContent;
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
      newData[2018].soc.m * 100,
    ];

    // 2017
    this.data.datasets[1].data = [
      newData[2017].eng.f * 100,
      newData[2017].eng.m * 100,
      newData[2017].soc.f * 100,
      newData[2017].soc.m * 100,
    ];

    // 2016
    this.data.datasets[2].data = [
      newData[2016].eng.f * 100,
      newData[2016].eng.m * 100,
      newData[2016].soc.f * 100,
      newData[2016].soc.m * 100,
    ];
  }
}


// create and export singleton
let genderDistPerFieldModel = new GenderDistPerFieldModel();
export default genderDistPerFieldModel;
