import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

// constants
import CSVFileNames from '../../constants/csv-file-names';

// models
import dataModel from '../../models/data-model';
import papersModel from '../../models/papers-model';
import womenFirstAuthorModel from './women-first-author-model';

// components
import DownloadChartButton from '../download-chart-button/download-chart-button.jsx';
import DownloadCSVButton from '../download-csv-button/download-csv-button.jsx';

// styles
require('./women-first-author-chart.scss');


export default class WomenFirstAuthorChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = 'womenAs1stAuthorChart';
    this.state = {
      hasData: false, 
      isComponentMounted: false
    };
    dataModel.updated.add(this.onDataUpdated, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="gender-distribution-chart">
        {
          (this.state.hasData) &&
          <div>
            <Bar
              id={this.chartId}
              data={womenFirstAuthorModel.data}
              options={womenFirstAuthorModel.options}
              redraw={true}
            />
            <DownloadChartButton
              targetId={this.chartId}
            />
            <DownloadCSVButton
              buttonLabel="Download CSV"
              fileName={CSVFileNames.WOMEN_1ST_AUTHORS_DISTRIBUTION}
              getCSV={womenFirstAuthorModel.getCSV.bind(womenFirstAuthorModel)}
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

    let num2018Papers = papersModel.getNumPapers(2018);
    let num2018Women1stAuthor = papersModel.getNumPapersWithWomenAsFirstAuthor(2018);
    let num2018Men1stAuthor = num2018Papers - num2018Women1stAuthor;

    let num2017Papers = papersModel.getNumPapers(2017);
    let num2017Women1stAuthor = papersModel.getNumPapersWithWomenAsFirstAuthor(2017);
    let num2017Men1stAuthor = num2017Papers - num2017Women1stAuthor;

    let num2016Papers = papersModel.getNumPapers(2016);
    let num2016Women1stAuthor = papersModel.getNumPapersWithWomenAsFirstAuthor(2016);
    let num2016Men1stAuthor = num2016Papers - num2016Women1stAuthor;

    womenFirstAuthorModel.updateData({
      2016: {
        f: num2016Women1stAuthor / num2016Papers,
        m: num2016Men1stAuthor / num2016Papers,
      },
      2017: {
        f: num2017Women1stAuthor / num2017Papers,
        m: num2017Men1stAuthor / num2017Papers,
      },
      2018: {
        f: num2018Women1stAuthor / num2018Papers,
        m: num2018Men1stAuthor / num2018Papers,
      },
    });

    this.setState({
      hasData: true
    });
  }
}
