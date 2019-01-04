import React, { Component } from 'react';

// styles
require('./download-csv-button.scss');


export default class DownloadCSVButton extends Component {
  constructor(props) {
    super(props);
  }


  // react methods definitions
  render() {
    return (
      <button
        className="btn-primary download-csv-button"
        onClick={this.onDownloadRequested.bind(this)}
      >{this.props.buttonLabel}</button>
    );
  }


  // methods definitions
  onDownloadRequested() {
    let csv = this.props.getCSV();

    var encodedUri = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.props.fileName);

    // required for firefox
    document.body.appendChild(link);

    link.click();

    // memory management
    document.body.removeChild(link);
  }
}