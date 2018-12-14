import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import genderDistModel from './gender-distribution-model';

// styles
require('./gender-distribution-chart.scss');


export default class GenderDistributionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    authorsModel.updated.add(this.onDataObtained, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <Bar
            data={genderDistModel.data}
            options={genderDistModel.options}
            redraw={true}
          />
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
  onDataObtained() {
    let dist = authorsModel.getGenderDistribution();
    genderDistModel.updateData([
      dist.f * 100,
      dist.m * 100
    ]);
    this.setState({
      hasData: true
    });
  }
}
