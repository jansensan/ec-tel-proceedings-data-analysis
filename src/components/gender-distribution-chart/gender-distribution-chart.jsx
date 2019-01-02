import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import genderDistModel from './gender-distribution-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';

// styles
require('./gender-distribution-chart.scss');


export default class GenderDistributionChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'genderDistChart';
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    dataModel.updated.add(this.onDataUpdated, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-distribution-chart">
        {
          (this.state.hasData) &&
          <div>
            <Bar
              id={this.chartId}
              data={genderDistModel.data}
              options={genderDistModel.options}
              redraw={true}
            />
            <DownloadChartButton
              targetId={this.chartId}
            />
          </div>
        }
      </div>
    )
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

    genderDistModel.updateData({
      2016: authorsModel.getGenderDistribution(2016),
      2017: authorsModel.getGenderDistribution(2017),
      2018: authorsModel.getGenderDistribution(2018)
    });

    this.setState({
      hasData: true
    });
  }
}
