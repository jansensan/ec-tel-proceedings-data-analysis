import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import fieldDistModel from './field-distribution-model';

// styles
require('./field-distribution-chart.scss');


export default class FieldDistributionChart extends Component {
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
      <div className="field-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <Bar
            data={fieldDistModel.data}
            options={fieldDistModel.options}
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
    let dist = authorsModel.getFieldDistribution();
    fieldDistModel.updateData([
      dist.eng * 100,
      dist.soc * 100
    ]);
    this.setState({
      hasData: true
    });
  }
}
