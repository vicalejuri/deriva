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
          {(this.props.db.status != 0 ?
            (this.props.children) :
            (<OfflineComponent/>)
          )}
        </div>
      </div>
    );
  }
});


// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

AppComponent = connect( (state) => {
  return {db: state.db }
})(AppComponent);


export default AppComponent;
module.exports = AppComponent;
