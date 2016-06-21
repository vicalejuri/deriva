import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

//require('normalize.css/normalize.css');
require('styles/deriva/App.scss');

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
module.exports = AppComponent;
