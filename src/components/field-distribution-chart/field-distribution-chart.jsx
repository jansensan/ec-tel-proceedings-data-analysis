import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
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
    dataModel.updated.add(this.onDataUpdated, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="field-distribution-chart">
        {
          (this.state.hasData) &&
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
  onDataUpdated() {
    if (!dataModel.hasData()) {
      return;
    }

    let dist2017 = authorsModel.getFieldDistribution(2017);
    let dist2018 = authorsModel.getFieldDistribution(2018);

    fieldDistModel.updateData({
      2017: {
        eng: dist2017.eng,
        soc: dist2017.soc,
      },
      2018: {
        eng: dist2018.eng,
        soc: dist2018.soc,
      },
    });

    this.setState({
      hasData: true
    });
  }
}
