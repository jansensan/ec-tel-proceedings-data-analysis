import React, { Component } from 'react';

// styles
require('./paper-display.scss');

export default class PaperDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };
  }


  // react methods definitions
  render() {
    return (
      <div className="paper-display">
        <p className="paper-title">{this.props.paper.title}</p>
        <ul>
        {
          this.props.paper.authors.map((author, i) => {
            return <li key={i}>{author.name}</li>
          })
        }
        </ul>
      </div>
    );
  }
}
