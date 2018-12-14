import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import dataModel from '../../models/data-model';
import womenFirstAuthorModel from './women-first-author-model';
import papersModel from '../../models/papers-model';

// styles
require('./women-first-author-chart.scss');


export default class WomenFirstAuthorChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    dataModel.updated.add(this.onDataObtained, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-distribution-chart">
        {
          (this.state.hasData > 0) &&
          <Bar
            data={womenFirstAuthorModel.data}
            options={womenFirstAuthorModel.options}
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
    let numPapers = papersModel.getPapers().length;
    let numPaperWomen1stAuthor = papersModel.getNumPapersWithWomenAsFirstAuthor();
    let numPaperMen1stAuthor = numPapers - numPaperWomen1stAuthor;
    womenFirstAuthorModel.updateData([
      (numPaperWomen1stAuthor / numPapers) * 100,
      (numPaperMen1stAuthor / numPapers) * 100
    ]);

    this.setState({
      hasData: true
    });
  }
}
