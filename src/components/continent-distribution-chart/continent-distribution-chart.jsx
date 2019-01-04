import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// constants
import CSVFileNames from '../../constants/csv-file-names';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import continentDistModel from './continent-distribution-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';
import DownloadCSVButton from '../download-csv-button/download-csv-button.jsx';

// styles
require('./continent-distribution-chart.scss');


export default class ContinentDistributionChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'continentDistChart';
    this.state = {
      isComponentMounted: false,
    };

    dataModel.updated.add(this.onDataUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="continent-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <div>
            <div className="chart-container">
              <Bar
                id={this.chartId}
                data={continentDistModel.data}
                options={continentDistModel.options}
                redraw={true}
              />
            </div>
            <DownloadChartButton
              targetId={this.chartId}
            />
            <DownloadCSVButton
              buttonLabel="Download CSV"
              fileName={CSVFileNames.CONTINENT_DISTRIBUTION}
              getCSV={continentDistModel.getCSV.bind(continentDistModel)}
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
    continentDistModel.updateData({
      2016: authorsModel.getNumAuthorsPerCountry(2016),
      2017: authorsModel.getNumAuthorsPerCountry(2017),
      2018: authorsModel.getNumAuthorsPerCountry(2018)
    });

    this.setState({
      hasData: true
    });
  }
}
