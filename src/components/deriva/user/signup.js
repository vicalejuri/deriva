'use strict';

import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

require('styles/deriva/user/signup.scss');

let SignupComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false}
  },

  signUp(ev) {
    // cancel form submission
    ev.preventDefault();

    let credentials = {username: this.refs.username.value,
                       password: this.refs.password.value }
    let metadata = {email: this.refs.email.value};
    console.log('signup ', credentials )

    window.remote_db.signup(credentials.username, credentials.password, {metadata},
       (err, response) => {
         if(err){
           let usernameConflict = (err.name === 'conflict');
           let invalidUsername = (err.name === 'forbidden');

           let msg = (usernameConflict ? 'Username already taken' :
                      invalidUsername ? 'Invalid username' :
                      'Cosmic rays are too strong!');

          console.log('signup','error',err);
           this.setState({success: false, failed: true, message: msg});
         } else {
           console.log('signup','success');
           this.setState({success: true, failed: false, message:
                          `Welcome ${credentials.username}`});
           // todo: Dispatch login
         }
    });
  },



  render() {
    let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("signup-component", signup_classes)}>
            <form onSubmit={this.signUp}>
              <div className="title">
                <h1>$ 1/mês</h1>
                <p>Faça uma doação</p>
              </div>
              <div> <input type="email" ref="email" id="Email" placeholder="Email"/>
              </div>
              <div> <input type="text" ref="username" id="username" placeholder="Usuário"/>
              </div>
              <div><input type="password" ref="password" id="password" placeholder="Senha"/>
              </div>
              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) :
                  (<p>Eu li os  <a href="#"> Telmos de selvisso</a>.</p>) }
              </div>
              <div className="submit">
                <input type="submit" ref="submit" value="Criar Conta" />
              </div>
            </form>
            </div>
    );
  }
});

SignupComponent.displayName = 'Deriva.user.SignupComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default SignupComponent;
