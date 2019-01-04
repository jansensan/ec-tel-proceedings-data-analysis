import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';

// constants
import CSVFileNames from '../../constants/csv-file-names';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import uniDistModel from './uni-distribution-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';
import DownloadCSVButton from '../download-csv-button/download-csv-button.jsx';

// styles
require('./uni-distribution-chart.scss');


export default class UniDistributionChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'uniDistChart';
    this.state = {
      isComponentMounted: false,
    };

    dataModel.updated.add(this.onDataUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="uni-distribution-chart">
        {
          (this.state.hasData) &&
          <div>
            <div className="chart-container">
              <HorizontalBar
                id={this.chartId}
                data={uniDistModel.data}
                options={uniDistModel.options}
                redraw={true}
                />
            </div>
            <DownloadChartButton
              targetId={this.chartId}
            />
            <DownloadCSVButton
              buttonLabel="Download CSV"
              fileName={CSVFileNames.UNIVERSITY_DISTRIBUTION}
              getCSV={uniDistModel.getCSV.bind(uniDistModel)}
            />
          </div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  onDataUpdated() {
    if (!dataModel.hasData()) {
      return;
    }

    uniDistModel.updateData({
      2016: authorsModel.getUniversityDistribution(2016),
      2017: authorsModel.getUniversityDistribution(2017),
      2018: authorsModel.getUniversityDistribution(2018)
    });

    this.setState({
      hasData: true
    });
  }
}
