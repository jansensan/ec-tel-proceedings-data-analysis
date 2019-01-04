import _ from 'lodash';

// services
import DatasetFactory from '../../services/dataset-factory';


class FieldDistributionModel {
  constructor() {
    this.data = {
      labels: ['2018', '2017', '2016'],
      datasets: [
        DatasetFactory.createOrangeDataset('2018'),
        DatasetFactory.createBlueDataset('2016'),
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
    let rows = ['field', '2018', '2017', '2016'];
    let csvContent = 'data:text/csv;charset=utf-8,'
      + rows.join(sep) + '\n';

    // engineering row
    let engRow = 'engineering'
      // 2018
      + sep + this.data.datasets[0].data[0]
      // 2017
      + sep + this.data.datasets[1].data[0]
      // 2016
      + sep + this.data.datasets[2].data[0];
    csvContent += engRow + '\n';

    // social sciences row
    let socRow = 'social sciences'
      // 2018
      + sep + this.data.datasets[0].data[1]
      // 2017
      + sep + this.data.datasets[1].data[1]
      // 2016
      + sep + this.data.datasets[2].data[1];
    csvContent += socRow + '\n';

    return csvContent;
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
    this.data.labels = ['Engineering', 'Social Sciences'],

    // set data

    // 2018
    this.data.datasets[0].data = [
      newData[2018].eng * 100,
      newData[2018].soc * 100,
    ];
    
    // 2017
    this.data.datasets[1].data = [
      newData[2017].eng * 100,
      newData[2017].soc * 100,
    ];
    
    // 2016
    this.data.datasets[2].data = [
      newData[2016].eng * 100,
      newData[2016].soc * 100,
    ];
  }
}


// create and export singleton
let fieldDistModel = new FieldDistributionModel();
export default fieldDistModel;
