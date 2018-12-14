import React, { Component } from 'react';

// styles
require('./author-display.scss');


export default class AuthorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };
  }


  // react methods definitions
  render() {
    return (
      <div className="author-display">
        <p className="author-name">{this.props.author.name} ({this.getGenderGlyph()})</p>
        <p className="author-uni">
          {
            (this.props.author.dept !== '') &&
            <span>{this.props.author.dept + ','}<br/></span>
          }
          {this.props.author.uni} ({this.props.author.country})
        </p>
        <p className="author-fields">({this.getField()})</p>
        <hr/>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  getField() {
    let field = '';
    if (this.props.author.field === 'eng') {
      field = 'Engineering';
    }
    if (this.props.author.field === 'soc') {
      field = 'Social Sciences';
    }
    return field;
  }

  getGenderGlyph() {
    return this.props.author.gender.toString().toUpperCase();
  }
}