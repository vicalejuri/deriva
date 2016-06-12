'use strict';

import React from 'react';

import {  Link } from 'react-router';

import classNames from 'classnames';

require('styles/deriva/user/login.scss');

let LoginComponent = React.createClass({
  getInitialState() {
    return { 'success': false, 'failed': false, 'message': false}
  },

  login(ev) {
    let credentials = {u: this.refs.username.value, p: this.refs.password.value};
    console.log("login", credentials.u, credentials.p);

    ev.preventDefault();

    window.remote_db.login( credentials.u, credentials.p,
      (err, response) => {
        if(err){
          console.log('login','error',err);
          this.setState({success: false, failed: true,
                         message: err.message});
        } else {
          debugger;
          this.setState({success: true, failed: false,
                         message: `Hello ${response.name}`});
        }
    });

  },

  render() {
    let login_failed = this.state.failed;
    let login_success = this.state.success;
    let login_classes = {'success': login_success, 'failed': login_failed};
    return (<form className={classNames('login-component box',login_classes)} onSubmit={this.login}>
             <div className="message">{this.state.message}</div>
             <div className="form-group">
                  <input type="text" ref="username" className="form-control" id="username" placeholder="Usuário"/>
             </div>
             <div className="form-group">
              <input type="password" ref="password" className="form-control" id="password" placeholder="Senha"/>
             </div>
             <div className="submit btn-group">
                <button ref="signup" value="Signup" className="btn btn-form btn-positive"><a href="/signup">Signup</a></button>
                <button type="submit" ref="submit" value="Acessar" className="btn btn-form btn-primary left" >OK</button>
             </div>
            </form>);
  }
});

LoginComponent.displayName = 'Deriva.user.LoginComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default LoginComponent;
