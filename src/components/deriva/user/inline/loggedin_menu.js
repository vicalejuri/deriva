'use strict';
import { Router, Route, Link, browserHistory } from 'react-router';

import React, {PropTypes} from 'react';
import _ from 'lodash';

import actions from 'actions';
import classNames from 'classnames';

require('styles/deriva/user/loggedin.scss');
let avatarImg = require('assets/components/user/avatar.jpg');

let LoggedInMenu = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  logout(ev) {
    ev.preventDefault();

    this.props.dispatch( actions.user.logout() );
    browserHistory.replace('/');
  },

  render() {
    //let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("sub-box sub-box-invert")}>
            <ul className="list-group">
              <li className="list-group-header">
                <div className="media-body">
                  <Link to="/dashboard/profile">
                    <img className="img-circle media-object pull-left" src={avatarImg} width="32" height="32" />
                    <strong> Hello {this.props.user.name} </strong>
                  </Link>
                </div>
              </li>
              <li className="list-group-item">
                <div onClick={this.logout} className="media-body btn">
                  <span className="icon icon-users icon-text"></span>
                  Logout
                </div>
              </li>
            </ul>
            </div>
    );
  }
});

LoggedInMenu.displayName = 'Deriva.user.LoggedInMenu';

// Connect to redux store
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

LoggedInMenu = connect( (state) => {
  return {user: state.data.user}
})(LoggedInMenu);



export default LoggedInMenu;
