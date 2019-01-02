import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import uniDistModel from './uni-distribution-model';

// styles
require('./uni-distribution-chart.scss');


export default class UniDistributionChart extends Component {
  constructor(props) {
    super(props);
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
          <HorizontalBar
            data={uniDistModel.data}
            options={uniDistModel.options}
            redraw={true}
          />
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
