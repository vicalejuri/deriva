import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

let yeomanImage = require('../assets/yeoman.png');
require('normalize.css/normalize.css');
require('styles/deriva/App.scss');

export let DefaultComponent = React.createClass({
  render() {
    return (
      <div className="index">
        <TorrentComponent file="seila" />
      </div>
    );
  }
});

/* App */
import HeaderComponent from 'components/Header.js';

let AppComponent = React.createClass({
  render() {
    return (
      <div id="app" className="window">
        <HeaderComponent />
        <div className="window-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
