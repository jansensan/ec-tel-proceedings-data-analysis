import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import authorsModel from '../../models/authors-model';
import genderDiversityModel from './gender-diversity-model';
import papersModel from '../../models/papers-model';

// styles
require('./gender-diversity-chart.scss');


export default class GenderDiversityChart extends Component {
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
      <div className="gender-diversity-chart">
        {
          (this.state.hasData > 0) &&
          <Bar
            data={genderDiversityModel.data}
            options={genderDiversityModel.options}
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
    let numPapersMenAuthors = papersModel.getNumPapersWithOnlyMenAuthors();
    let numPapersWomenAuthors = papersModel.getNumPapersWithOnlyWomenAuthors();
    let numPapers = papersModel.getPapers().length;
    let numRemainingAuthors = numPapers - numPapersMenAuthors - numPapersWomenAuthors;

    genderDiversityModel.updateData([
      (numPapersWomenAuthors / numPapers) * 100,
      (numPapersMenAuthors / numPapers) * 100,
      (numRemainingAuthors / numPapers) * 100
    ]);
    this.setState({
      hasData: true
    });
  }
}
