import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

//require('normalize.css/normalize.css');
require('styles/deriva/App.scss');

/* App */
import HeaderComponent from 'components/header.jsx';
import OfflineComponent from 'components/offline.jsx';

let AppComponent = React.createClass({
  render() {
    return (
      <div className="viewport">
        <HeaderComponent />
        <div className="window-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});


// Connect to redux store
import actions from 'actions'
import { connect } from 'react-redux'

AppComponent = connect( (state) => {
  return {db: state.db }
})(AppComponent);


export default AppComponent;
module.exports = AppComponent;
