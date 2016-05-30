'use strict';

import React from 'react';
import Parse from 'parse';

import {  Link } from 'react-router';

import classNames from 'classnames';

require('styles/deriva/user/login.scss');

let LoginComponent = React.createClass({
  getInitialState() {
    return { 'success': false, 'failed': false, 'message': ''}
  },

  login() {
    let credentials = {u: this.refs.username.value, p: this.refs.password.value};
    console.log("login", credentials.u, credentials.p);

    Parse.User.logIn( credentials.u , credentials.p , {
      success: (user) => {
        // do stuff
        this.setState({success: true, failed: false,
                       message: `Hello ${user.get('username')}`});
        // dispatch 'loggedin'
      },
      error: (user,error) => {
        this.setState({failed: true, message: error.message});
        console.error(error.code, error.message);
      }
    });
  },

  render() {
    let login_failed = this.state.failed;
    let login_success = this.state.success;
    let login_classes = {'success': login_success, 'failed': login_failed};
    return (<div className={classNames('login-component',login_classes)}>
            <div className="message">{this.state.message}</div>
             <div>
                  <input type="text" ref="username" id="username" placeholder="Usuário"/>
             </div>
             <div>
              <input type="password" ref="password" id="password" placeholder="Senha"/>
             </div>
             <div className="submit">
              <input type="submit" ref="submit" ref="submit" value="Acessar >" onClick={this.login}/>
             </div>
            </div>
    );
  }
});

LoginComponent.displayName = 'Deriva.user.LoginComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default LoginComponent;
