import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
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
    authorsModel.updated.add(this.onDataObtained, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-dist-per-field-chart">
        {
          (this.state.hasData > 0) &&
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
  onDataObtained() {
    let dist = authorsModel.getGenderDistPerField();
    genderDistPerFieldModel.updateData(
      [dist.eng.f * 100, dist.soc.f * 100],
      [dist.eng.m * 100, dist.soc.m * 100]
    );
    this.setState({
      hasData: true
    });
  }
}
