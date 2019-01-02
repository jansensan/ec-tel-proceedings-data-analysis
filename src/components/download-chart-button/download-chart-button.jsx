import React, { Component } from 'react';

// styles
require('./download-chart-button.scss');


export default class DownloadChartButton extends Component {
  constructor(props) {
    super(props);
  }


  // react methods definitions
  render() {
    return (
      <button
        className="btn-primary download-chart-button"
        onClick={this.onDownloadRequested.bind(this)}
      >Download chart</button>
    );
  }


  // methods definitions
  onDownloadRequested() {
    let chart = document.getElementById(this.props.targetId);
    var img = chart.toDataURL('image/png');
    let newWin = window.open();
    newWin.document.write('<img src="' + img + '"/>');
  }
}