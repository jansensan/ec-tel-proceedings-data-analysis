import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import {saveSvgAsPng} from 'save-svg-as-png';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import countryDistModel from './country-distribution-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';

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
            <Bar
              id={this.chartId}
              data={countryDistModel.data}
              options={countryDistModel.options}
              redraw={true}
            />
            <DownloadChartButton
              targetId={this.chartId}
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
