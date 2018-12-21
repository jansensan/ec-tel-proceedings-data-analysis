import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import genderDistPerFieldModel from './gender-dist-per-field-model';

// styles
require('./gender-dist-per-field-chart.scss');


export default class GenderDistPerFieldChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    dataModel.updated.add(this.onDataUpdated, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-dist-per-field-chart">
        {
          (this.state.hasData) &&
          <Bar
            data={genderDistPerFieldModel.data}
            options={genderDistPerFieldModel.options}
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
  onDataUpdated() {
    if (!dataModel.hasData()) {
      return;
    }

    genderDistPerFieldModel.updateData({
      2017: authorsModel.getGenderDistPerField(2017),
      2018: authorsModel.getGenderDistPerField(2018),
    });

    this.setState({
      hasData: true
    });
  }
}
