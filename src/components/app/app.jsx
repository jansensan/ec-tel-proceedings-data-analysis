import React, { Component } from 'react';

// models
import authorsModel from '../../models/authors-model';
import dataModel from '../../models/data-model';
import papersModel from '../../models/papers-model';

// components
import AuthorDisplay from '../author-display/author-display.jsx';
import ContinentDistributionChart from '../continent-distribution-chart/continent-distribution-chart.jsx';
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
    dataModel.fetch(2016);
    dataModel.fetch(2017);
    dataModel.fetch(2018);

    // listen to signals
    authorsModel.updated.add(this.update, this);
  }


  // react methods definitions
  render() {
    return (
      <div className="app">
        <header>
          <div className="centered">
            <div className="title">EC-TEL</div>
            <div className="description">European Conference on Technology Enhanced Learning</div>
          </div>
        </header>

        <div className="centered">
          <h1>Data Analysis</h1>

          <section>
            <h2><a name="tableOfContents"></a>Table of Contents</h2>
            <ul>
              <li>
                <a href="#overview">Overview</a>
              </li>
              <li>
                <a href="#locationDiversity">Location Diversity</a>
                <ul>
                  <li><a href="#countryDist">Country Distribution</a></li>
                  <li><a href="#continentDist">Continent Distribution</a></li>
                  <li><a href="#institutionDist">Institution Distribution</a></li>
                </ul>
              </li>
              <li>
                <a href="#genderDiversity">Gender Diversity</a>
                <ul>
                  <li><a href="#someNumbers">Some Numbers</a></li>
                  <li><a href="#genderDist">Gender Distribution</a></li>
                  <li><a href="#womenAs1stAuthor">Women as First Author</a></li>
                  <li><a href="#genderDiversityByPaper">Gender Diversity by Paper</a></li>
                </ul>
              </li>
              <li>
                <a href="#interdisciplinarity">Interdisciplinarity</a>
                <ul>
                  <li><a href="#fieldDist">Field Distribution</a></li>
                  <li><a href="#genderDistPerField">Gender Distribution per Field</a></li>
                </ul>
              </li>
              <li>
                <a href="#sourceCode">Source Code</a>
              </li>
            </ul>
            <hr/>
          </section>

          <section>
            <h2><a name="overview"></a>Overview</h2>
            <p>This analysis explores the gender diversity of authors of the papers and presentations of the <a href="http://www.ec-tel.eu/">European Conference on Technology Enhanced Learning (EC-TEL)</a> conferences and proceedings.</p>
            <p>The data was gathered from the proceedings books available on the conference's website.</p>
            <ul>
              <li>We used binary values for gender: male and female authors;</li>
              <li>Fields of research and work were separated in two (2) broad categories: engineering and social sciences;</li>
              <li>For simplicity's sake, we only used the first university or institution mentioned when a researcher/academic listed more than one in their credit.</li>
            </ul>
            <p>This data analysis has been conducted for <a href="https://www.upf.edu/web/tide">TIDE Research Group of Interactive and Distributed Technologies for Education (UPF)</a>.</p>
            <h3>Some Numbers</h3>
            <Overview
              conferenceTitle="13th European Conference on Technology Enhanced Learning, EC-TEL 2018, Leeds, UK, September 3-5, 2018"
              year="2018"
              />
            <Overview
              conferenceTitle="12th European Conference on Technology Enhanced Learning, EC-TEL 2017, Tallinn, Estonia, September 12–15, 2017"
              year="2017"
            />
            <Overview
              conferenceTitle="11th European Conference on Technology Enhanced Learning, EC-TEL 2016, Lyon, France, September 13-16, 2016"
              year="2016"
            />
            <hr/>
          </section>

          <section>
            <h2><a name="locationDiversity"></a>Location Diversity</h2>

            <section>
              <h3><a name="countryDist"></a>Country Distribution</h3>
              <p>Percentage of authors per country, sorted in descending order, based on cumulative percentage of authors over years covered by the analysis.</p>
              <CountryDistributionChart />
              <hr/>
            </section>

            <section>
              <h3><a name="continentDist"></a>Continent Distribution</h3>
              <p>Percentage of authors per continent.</p>
              <ContinentDistributionChart />
              <hr/>
            </section>

            <section>
              <h3><a name="institutionDist"></a>Institution Distribution</h3>
              <p>Number of authors per institution, sorted in descending order, based on cumulative number of authors over years covered by the analysis.</p>
              <UniDistributionChart />
              <hr/>
            </section>
          </section>

          <section>
            <h2><a name="genderDiversity"></a>Gender Diversity</h2>

            <section>
              <h3><a name="someNumbers"></a>Some Numbers</h3>
              <GenderDistOverview />
              <hr/>
            </section>

            <section>
              <h3><a name="genderDist"></a>Gender Distribution</h3>
              <p>Percentage of unique authors of each gender.</p>
              <GenderDistributionChart />
              <hr/>
            </section>

            <section>
              <h3><a name="womenAs1stAuthor"></a>Women as First Author</h3>
              <p>Papers in which a woman's name is the first name in the author list.</p>
              <WomenFirstAuthorChart />
              <hr/>
            </section>

            <section>
              <h3><a name="genderDiversityByPaper"></a>Gender Diversity by Paper</h3>
              <GenderDiversityChart />
              <hr/>
            </section>
          </section>

          <section>
            <h2><a name="interdisciplinarity"></a>Interdisciplinarity</h2>

            <section>
              <h3><a name="fieldDist"></a>Field Distribution</h3>
              <FieldDistributionChart />
              <hr/>
            </section>

            <section>
              <h3><a name="genderDistPerField"></a>Gender Distribution per Field</h3>
              <GenderDistPerFieldChart />
              <hr/>
            </section>
          </section>

          {/*
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
           */}

           <section>
             <h2><a name="sourceCode"></a>Source Code</h2>
             <p>All sources for this page and the related data are hosted on a <a href="https://github.com/jansensan/ec-tel-proceedings-data-analysis">Github repository</a>, so that they can be available for review and reuse.</p>
             <hr/>
           </section>
        </div>

        <footer>
          <div className="centered">
          <div className="title">EC-TEL</div>
            <div className="description">European Conference on Technology Enhanced Learning</div>
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