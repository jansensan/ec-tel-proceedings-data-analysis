import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

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
          <Bar
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
    uniDistModel.updateData(authorsModel.getUniversityDistribution());
    this.setState({
      hasData: true
    });
  }
}
