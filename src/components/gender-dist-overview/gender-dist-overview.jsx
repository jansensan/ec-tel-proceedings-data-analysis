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
          (this.state.hasData) &&
          <div className="generalities">
            <ul>
              <li>
                <span className="value-label">Number of authors:</span>
                <ul>
                  <li>
                    <span className="value-label">2018:</span>
                    <span className="value-display">{authorsModel.getNumAuthors(2018)}</span>
                  </li>
                  <li>
                    <span className="value-label">2017:</span>
                    <span className="value-display">{authorsModel.getNumAuthors(2017)}</span>
                  </li>
                  <li>
                    <span className="value-label">2016:</span>
                    <span className="value-display">{authorsModel.getNumAuthors(2016)}</span>
                  </li>
                </ul>
              </li>
              <li>
                <span className="value-label">Number of women authors:</span>
                <ul>
                  <li>
                    <span className="value-label">2018:</span>
                    <span className="value-display">{authorsModel.getFemaleAuthors(2018).length}</span>
                  </li>
                  <li>
                    <span className="value-label">2017:</span>
                    <span className="value-display">{authorsModel.getFemaleAuthors(2017).length}</span>
                  </li>
                  <li>
                    <span className="value-label">2016:</span>
                    <span className="value-display">{authorsModel.getFemaleAuthors(2016).length}</span>
                  </li>
                </ul>
              </li>
              <li>
                <span className="value-label">Number of men authors:</span>
                <ul>
                  <li>
                    <span className="value-label">2018:</span>
                    <span className="value-display">{authorsModel.getMaleAuthors(2018).length}</span>
                  </li>
                  <li>
                    <span className="value-label">2017:</span>
                    <span className="value-display">{authorsModel.getMaleAuthors(2017).length}</span>
                  </li>
                  <li>
                    <span className="value-label">2016:</span>
                    <span className="value-display">{authorsModel.getMaleAuthors(2016).length}</span>
                  </li>
                </ul>
              </li>
              <li>
                <span className="value-label">Mean representation of women per paper:</span>
                <ul>
                  <li>
                    <span className="value-label">2018:</span>
                    <span className="value-display">{this.state.womenMean2018}</span>
                  </li>
                  <li>
                    <span className="value-label">2017:</span>
                    <span className="value-display">{this.state.womenMean2017}</span>
                  </li>
                  <li>
                    <span className="value-label">2016:</span>
                    <span className="value-display">{this.state.womenMean2016}</span>
                  </li>
                </ul>
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
    if (!dataModel.hasData()) {
      return;
    }

    let mean2018 = papersModel.getWomenMeanRepresentation(2018);
    let mean2017 = papersModel.getWomenMeanRepresentation(2017);
    let mean2016 = papersModel.getWomenMeanRepresentation(2016);

    this.setState({
      womenMean2018: _.round(mean2018, 2),
      womenMean2017: _.round(mean2017, 2),
      womenMean2016: _.round(mean2016, 2),
      hasData: true
    });
  }
}
