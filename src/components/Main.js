require('normalize.css/normalize.css');
require('styles/App.css');

import {  Link } from 'react-router';

import React from 'react';

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
import WatchDoc from 'components/deriva/WatchDoc.js';
import ListDoc from 'components/deriva/ListDoc.js';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="viewport">
        <nav className="heaver-nav">
          <ul>
            <li><Link to="/list">All Docs</Link></li>
          </ul>
        </nav>
        <div className="canvas">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
