import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

import LoginComponent from './inline/login.js';

let LoginPageComponent = React.createClass({
  ComponentDidMount(){
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

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default LoginPageComponent;
module.exports = LoginPageComponent;
