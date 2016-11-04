import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

//require('normalize.css/normalize.css');
require('styles/deriva/App.scss');

/* App */
import HeaderComponent from 'components/Header.js';
import OfflineComponent from 'components/Offline.jsx';

let AppComponent = React.createClass({
  render() {
    return (
      <div>
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
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(AppComponent);


export default AppComponent;
module.exports = AppComponent;
