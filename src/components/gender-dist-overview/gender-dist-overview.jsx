import _ from 'lodash';
import React, { Component } from 'react';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import papersModel from '../../models/papers-model';

// styles
require('./gender-dist-overview.scss');


export default class GenderDistOverview extends Component {
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
      <div className="gender-dist-overview">
        {
          (dataModel.data.length > 0) &&
          <div className="generalities">
            <ul>
              <li>
                <span className="value-label">Number of authors:</span>
                <span className="value-display">{authorsModel.authors.length}</span>
              </li>
              <li>
                <span className="value-label">Number of women authors:</span>
                <span className="value-display">{authorsModel.getFemaleAuthors().length}</span>
              </li>
              <li>
                <span className="value-label">Number of men authors:</span>
                <span className="value-display">{authorsModel.getMaleAuthors().length}</span>
              </li>
              <li>
                <span className="value-label">Mean representation of women per paper:</span>
                <span className="value-display">{this.state.womenRepresentationMean}</span>
              </li>
            </ul>
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
    let mean = papersModel.getWomenMeanRepresentation();
    this.setState({
      womenRepresentationMean: _.round(mean, 2),
      womenRepresentationPercentage: _.round(mean * 100, 1)
    });
  }
}
