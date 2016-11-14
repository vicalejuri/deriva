import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import LoginComponent from './inline/login.jsx';
import actions from 'actions';

let LoginPageComponent = React.createClass({
  componentWillMount(){
    this.props.dispatch( actions.ui.set_ui_property('header.floated', false));
  },

  render() {
    return (<div className={classNames("page-column box")}>
              <LoginComponent></LoginComponent>

              <div className="useful-actions">
                <h6>OR</h6>
                <Link to={`/users/signup`} className="btn btn-primary btn-rounded">Signup</Link>
              </div>

            </div>
    );
  }
});

LoginPageComponent.displayName = 'Deriva.user.LoginPageComponent';

// Add dispatch/state from redux
import { connect } from 'react-redux';
LoginPageComponent = connect( (state) => {
  return {};
})(LoginPageComponent)

export default LoginPageComponent;
module.exports = LoginPageComponent;
