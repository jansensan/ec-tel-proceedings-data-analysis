import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// constants
import CSVFileNames from '../../constants/csv-file-names';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import countryDistModel from './country-distribution-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';
import DownloadCSVButton from '../download-csv-button/download-csv-button.jsx';

// styles
require('./country-distribution-chart.scss');


export default class CountryDistributionChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'countryDistChart';
    this.state = {
      isComponentMounted: false,
    };

    dataModel.updated.add(this.onDataUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="country-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <div>
            <div className="chart-container">
              <Bar
                id={this.chartId}
                data={countryDistModel.data}
                options={countryDistModel.options}
                redraw={true}
              />
            </div>
            <DownloadChartButton
              targetId={this.chartId}
            />
            <DownloadCSVButton
              buttonLabel="Download CSV"
              fileName={CSVFileNames.COUNTRY_DISTRIBUTION}
              getCSV={countryDistModel.getCSV.bind(countryDistModel)}
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
    countryDistModel.updateData({
      2016: authorsModel.getCountryDistribution(2016),
      2017: authorsModel.getCountryDistribution(2017),
      2018: authorsModel.getCountryDistribution(2018)
    });

    this.setState({
      hasData: true
    });
  }
}
