'use strict';

import React from 'react';

import {  Link } from 'react-router';

import classNames from 'classnames';

require('styles/deriva/user/login.scss');

let LoginComponent = React.createClass({
  getInitialState() {
    return { 'success': false, 'failed': false, 'message': false}
  },

  login() {
    let credentials = {u: this.refs.username.value, p: this.refs.password.value};
    console.log("login", credentials.u, credentials.p);

    window.remote_db.login( credentials.u, credentials.p,
      (err, response) => {
        if(err){
          console.log('login','error',err);
          this.setState({success: false, failed: true,
                         message: err.message});
        } else {
          this.setState({success: true, failed: false,
                         message: `Hello ${response.name}`});
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
            </div>);
  }
});

LoginComponent.displayName = 'Deriva.user.LoginComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default LoginComponent;
