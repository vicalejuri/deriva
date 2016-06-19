'use strict';

import React, {PropTypes} from 'react';
import _ from 'lodash';

import classNames from 'classnames';

require('styles/deriva/user/profile.scss');
let ProfileComponent = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  logout(ev) {
    ev.preventDefault();

    console.log('lgoout');
    this.props.actions.logout();
  },

  render() {
    //let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("profile-component box")}>
            <ul className="list-group">
              <li className="list-group-header">
                <div className="media-body">
                  <img className="img-circle media-object pull-left" src="/assets/components/user/avatar.jpg" width="32" height="32" />
                  <strong> Hello {this.props.user.name} </strong>
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

ProfileComponent.displayName = 'Deriva.user.ProfileComponent';

// Connect to redux store
import actions from 'actions';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

ProfileComponent = connect( (state) => {
  return {user: state.user}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ProfileComponent);



export default ProfileComponent;
