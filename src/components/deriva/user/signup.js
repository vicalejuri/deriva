'use strict';

import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import nacl from 'tweetnacl';

require('styles/deriva/user/signup.scss');

let SignupComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false, invite: 'empty'}
  },

  isValidInvite( ev ){
    ev.preventDefault();

    let invite_code = this.refs.invite.value;

    const hash = nacl.hash( invite_code );
    let hex_code = hash;

    console.log(hex_code, hash);
    const hash2 = nacl.hash('alienacao')
    console.log( hash2 );

    // alienação || alienacao
    if(hex_code == "77fe165ab27d4ba9b479145402529d9816b4fc83bbace71948d656f9321ec6d6" ||
       hex_code == "037d3826e59234c02644da2fda5eaab0da21ede8dae58282ac91bd9ff827a235" ){
      this.setState({invite: 'success'});
    } else {
      this.setState({invite: 'error'})
    }
  },

  signUp(ev) {
    // cancel form submission
    ev.preventDefault();

    let credentials = {username: this.refs.username.value,
                       password: this.refs.password.value }
    let metadata = {email: this.refs.email.value};

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
    return (<div className={classNames("signup-component box", signup_classes)}>
            <form onSubmit={this.signUp}>
              <div className="title">
                <h1>DERIVA</h1>
                <input id="invite" ref="invite" type="text" onBlur={this.isValidInvite}
                className={classNames("form-control", this.state.invite)} placeholder="Invite password" />
                <p>Only invited users</p>
              </div>
              <div> <input type="email" className="form-control" ref="email" id="email" placeholder="Email"/>
              </div>
              <div> <input type="text" className="form-control" ref="username" id="username" placeholder="Usuário"/>
              </div>
              <div><input type="password" className="form-control" ref="password" id="password" placeholder="Senha"/>
              </div>
              <div className="terms checkbox">
              { this.state.message ? (<p>{this.state.message}</p>) :
                (<label>
                  <input type="checkbox"></input>
                    Eu li os  <a href="#"> Telmos de selvisso</a>.
                </label>)
              }
              </div>
              <div className="submit">
                <button ref="signup" value="Criar conta" className="btn btn-form btn-primary">Criar conta</button>
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
module.exports = SignupComponent;
