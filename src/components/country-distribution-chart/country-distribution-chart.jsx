import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import countryDistModel from './country-distribution-model';

// styles
require('./country-distribution-chart.scss');


export default class CountryDistributionChart extends Component {
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
      <div className="country-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <Bar
            data={countryDistModel.data}
            options={countryDistModel.options}
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
    countryDistModel.updateData({
      2017: authorsModel.getCountryDistribution(2017),
      2018: authorsModel.getCountryDistribution(2018)
    });

    this.setState({
      hasData: true
    });
  }
}
