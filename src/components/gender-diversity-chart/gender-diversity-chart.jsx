import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// models
import dataModel from '../../models/data-model';
import genderDiversityModel from './gender-diversity-model';
import papersModel from '../../models/papers-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';

// styles
require('./gender-diversity-chart.scss');


export default class GenderDiversityChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'genderDiversityByPaperChart';
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    dataModel.updated.add(this.onDataUpdated, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-diversity-chart">
        {
          (this.state.hasData) &&
          <div>
            <Bar
              id={this.chartId}
              data={genderDiversityModel.data}
              options={genderDiversityModel.options}
              redraw={true}
            />
            <DownloadChartButton
              targetId={this.chartId}
            />
          </div>
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

    let numPapersOnlyMen2018 = papersModel.getNumPapersWithOnlyMenAuthors(2018);
    let numPapersOnlyWomen2018 = papersModel.getNumPapersWithOnlyWomenAuthors(2018);
    let numPapers2018 = papersModel.getNumPapers(2018);
    let numRemaining2018 = numPapers2018 - numPapersOnlyMen2018 - numPapersOnlyWomen2018;

    let numPapersOnlyMen2017 = papersModel.getNumPapersWithOnlyMenAuthors(2017);
    let numPapersOnlyWomen2017 = papersModel.getNumPapersWithOnlyWomenAuthors(2017);
    let numPapers2017 = papersModel.getNumPapers(2017);
    let numRemaining2017 = numPapers2017 - numPapersOnlyMen2017 - numPapersOnlyWomen2017;

    let numPapersOnlyMen2016 = papersModel.getNumPapersWithOnlyMenAuthors(2016);
    let numPapersOnlyWomen2016 = papersModel.getNumPapersWithOnlyWomenAuthors(2016);
    let numPapers2016 = papersModel.getNumPapers(2016);
    let numRemaining2016 = numPapers2016 - numPapersOnlyMen2016 - numPapersOnlyWomen2016;

    genderDiversityModel.updateData({
      2016: {
        f: numPapersOnlyWomen2016 / numPapers2016,
        m: numPapersOnlyMen2016 / numPapers2016,
        r: numRemaining2016 / numPapers2016,
      },
      2017: {
        f: numPapersOnlyWomen2017 / numPapers2017,
        m: numPapersOnlyMen2017 / numPapers2017,
        r: numRemaining2017 / numPapers2017,
      },
      2018: {
        f: numPapersOnlyWomen2018 / numPapers2018,
        m: numPapersOnlyMen2018 / numPapers2018,
        r: numRemaining2018 / numPapers2018,
      }
    });

    this.setState({
      hasData: true
    });
  }
}
