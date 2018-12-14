import React, { Component } from 'react';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import papersModel from '../../models/papers-model';

// styles
require('./overview.scss');


export default class Overview extends Component {
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
      <div className="overview">

        <div className="cover">
          <img
            src="images/ec-tel-proceedings-cover-2017.jpg"
            alt="EC-TEL 2017 Proceedings Cover Page"
            title="EC-TEL 2017 Proceedings Cover Page"
          />
        </div>

        {
          (dataModel.data.length > 0) &&
          <div className="generalities">
            <p>
              <span className="value-label">Number of papers:</span>
              <span className="value-display">{papersModel.getPapers().length}</span>
            </p>
            <p>
              <span className="value-label">Number of authors:</span>
              <span className="value-display">{authorsModel.authors.length}</span>
            </p>
            <p>
              <span className="value-label">Number of countries represented:</span>
              <span className="value-display">{authorsModel.getUniqueCountries().length}</span>
            </p>
            <p>
              <span className="value-label">Number of universities/research centers/etc. represented:</span>
              <span className="value-display">{authorsModel.getUniqueUniversities().length}</span>
            </p>
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
    
  }
}
