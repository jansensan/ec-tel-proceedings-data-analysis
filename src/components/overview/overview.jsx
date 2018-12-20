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
  }

  // react methods definitions
  render() {
    return (
      <div className="overview">

        <div className="cover">
          <img
            src={this.getImageURL()}
            alt={this.getImageAlt()}
            title={this.getImageAlt()}
          />
        </div>

        {
          (dataModel.hasData()) &&
          <div className="generalities">
            <p className="conference-title">{this.props.conferenceTitle}</p>
            <ul>
              <li>
                <span className="value-label">Number of papers:</span>
                <span className="value-display">{papersModel.getNumPapers(this.getYearProp())}</span>
              </li>
              <li>
                <span className="value-label">Number of authors:</span>
                <span className="value-display">{authorsModel.getNumAuthors(this.props.year)}</span>
              </li>
              <li>
                <span className="value-label">Number of countries represented:</span>
                <span className="value-display">{authorsModel.getUniqueCountries(this.props.year).length}</span>
              </li>
              <li>
                <span className="value-label">Number of universities/research centers/etc. represented:</span>
                <span className="value-display">{authorsModel.getUniqueUniversities(this.props.year).length}</span>
              </li>
              {/* 
               */}
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
  getImageAlt() {
    return 'EC-TEL ' + this.props.year + ' Proceedings Cover Page';
  }

  getImageURL() {
    return 'images/ec-tel-proceedings-cover-' + this.props.year + '.jpg';
  }

  getYearProp() {
    return parseInt(this.props.year, 10);
  }
}
