import React, { Component } from 'react';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import papersModel from '../../models/papers-model';

// components
import AuthorDisplay from '../author-display/author-display.jsx';
import CountryDistributionChart from '../country-distribution-chart/country-distribution-chart.jsx';
import FieldDistributionChart from '../field-distribution-chart/field-distribution-chart.jsx';
import GenderDistOverview from '../gender-dist-overview/gender-dist-overview.jsx';
import GenderDistPerFieldChart from '../gender-dist-per-field-chart/gender-dist-per-field-chart.jsx';
import GenderDistributionChart from '../gender-distribution-chart/gender-distribution-chart.jsx';
import GenderDiversityChart from '../gender-diversity-chart/gender-diversity-chart.jsx';
import Overview from '../overview/overview.jsx';
import PaperDisplay from '../paper-display/paper-display.jsx';
import UniDistributionChart from '../uni-distribution-chart/uni-distribution-chart.jsx';
import WomenFirstAuthorChart from '../women-first-author-chart/women-first-author-chart.jsx';

// styles
require('./app.scss');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };

    // pull data
    dataModel.fetch(2017);

    // listen to signals
    authorsModel.updated.add(this.update, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="app">
        <header>
          <div className="centered">
            <div className="title">EC-TEL 2017</div>
            <div className="description">12th European Conference on Technology Enhanced Learning</div>
          </div>
        </header>

        <div className="centered">
          <h1>Data Analysis</h1>

          <section>
            <h2>Overview</h2>
            <Overview />
            <hr/>
          </section>

          <section>
            <h2>Location Diversity</h2>

            <section>
              <h3>Country Distribution</h3>
              <CountryDistributionChart />
              <hr/>
            </section>

            <section>
              <h3>Universities Distribution</h3>
              <UniDistributionChart />
              <hr/>
            </section>
          </section>

          <section>
            <h2>Gender Diversity</h2>

            <section>
              <h3>Some Statistics</h3>
              <GenderDistOverview />
              <hr/>
            </section>

            <section>
              <h3>Gender Distribution</h3>
              <GenderDistributionChart />
              <hr/>
            </section>

            <section>
              <h3>Women as First Author</h3>
              <p>Papers in which women are the first name in the author list.</p>
              <WomenFirstAuthorChart />
              <hr/>
            </section>

            <section>
              <h3>Gender Diversity by Paper</h3>
              <GenderDiversityChart />
              <hr/>
            </section>
          </section>

          <section>
            <h2>Interdisciplinarity</h2>

            <section>
              <h3>Field Distribution</h3>
              <FieldDistributionChart />
              <hr/>
            </section>

            <section>
              <h3>Gender Distribution per Field</h3>
              <GenderDistPerFieldChart />
              <hr/>
            </section>
          </section>

          <section>
            <h2>Papers</h2>
            {
              papersModel.getPapers().map((paper, i) => {
                return <PaperDisplay
                  key={i}
                  index={i}
                  paper={paper}
                ></PaperDisplay>
              })
            }
            <hr />
          </section>

          <section>
            <h2>Authors</h2>
            {
              authorsModel.authors.map((author, i) => {
                return <AuthorDisplay
                  key={i}
                  index={i}
                  author={author}
                ></AuthorDisplay>
              })
            }
            <hr/>
          </section>
        </div>

        <footer>
          <div className="centered">
          <div className="title">EC-TEL 2017</div>
            <div className="description">12th European Conference on Technology Enhanced Learning</div>
          </div>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}