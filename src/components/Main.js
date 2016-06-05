require('normalize.css/normalize.css');
require('styles/App.scss');

import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

let yeomanImage = require('../assets/yeoman.png');
export let DefaultComponent = React.createClass({
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Default component</div>
      </div>
    );
  }
});

/* App */
import HeaderComponent from 'components/Header.js';

let AppComponent = React.createClass({
  render() {
    return (
      <div id="app">
        <HeaderComponent />
        <div className="canvas">
          {this.props.children}
        </div>
      </div>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
