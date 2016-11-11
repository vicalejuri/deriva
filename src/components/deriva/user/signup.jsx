import React from 'react';

import {  Link , browserHistory } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

import actions from 'actions';

let SignupComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false, invite: 'empty'}
  },

  componentWillMount(){
    require('styles/deriva/user/signup.scss');
    this.props.dispatch( actions.ui.set_ui_property('header.floated', false) );
  },

  isValidInvite( ev ){
    ev.preventDefault();

    let invite_code = this.refs.invite.value;
    let uint8_invite = util.decodeUTF8(invite_code);

    const uint8_hash = nacl.hash( uint8_invite );
    let hex_code = util.encodeBase64( uint8_hash )

    //const hash2 = nacl.hash('alienacao')
    //console.log( hash2 );

    // alienação || alienacao
    if(hex_code == "covGM2PC9I9YHBJrqom/8PXujTGokJinFuoOjbh9kkBvDQ8wc9gIzmKyaGzk4aq1yyGoFCe0mnQJ+m9byMSY/Q==" ||
       hex_code == "V5dhqki0pnXr9wR+ChlSi4pBsIzNXif4uVeTucg0NL7sVxfBvfLZtHY6AqyJD//ThJoQoEhusFex0+lTkzMXMA==" ){
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
    let metadata = {};

    this.props.dispatch( actions.user.signup( credentials, metadata) )
    .then( (res) => {
       this.setState({success: true, failed: false, message:
                      `Welcome ${credentials.username}`});
       browserHistory.push( '/dashboard' );
     })
    .catch( (err) => {
       let usernameConflict = (err.name === 'conflict');
       let invalidUsername = (err.name === 'forbidden');

       let msg = (usernameConflict ? 'Username already taken' :
                  invalidUsername ? 'Invalid username' :
                  err.message );

       console.log('signup','error',err);
       this.setState({success: false, failed: true, message: msg});
    });

  },



  render() {
    let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("signup-component page-column","box")}>
            <form onSubmit={this.signUp}>
              <div className="title">
                <h1>DERIVA</h1>
                <div className={classNames("sub-box", "white", this.state.invite )} >
                  <p>* Only for invited users</p>
                  <input id="invite" ref="invite" type="text" onBlur={this.isValidInvite}
                  className={classNames("form-control")} placeholder="Invite password" />
                </div>
              </div>
            <div className={classNames("sub-box","flex-column","signup", signup_classes)}>
              <div className="form-group">
                <label for="username">Usuário</label>
                <input type="text" className="form-control" ref="username" autocomplete="username" id="username" placeholder="Usuário"/>
              </div>
              <div className="form-group">
                <label for="password">Senha</label>
                <input type="password" className="form-control" ref="password" autocomplete="password" id="password" placeholder="Senha"/>
              </div>
              <div className="message">
                {this.state.message}
              </div>
            </div>
              <div className="terms checkbox">
                (<label>
                    <input type="checkbox" value="terms"></input>
                    Eu aceito os  <a href="#">termos d uso</a>. Nós guardamos seus dados criptografados e não temos acesso.
                </label>)
              </div>
              <div className="submit">
                <button ref="signup" value="Criar conta" className="btn btn-rounded btn-primary">Criar conta</button>
              </div>
            </form>

            <div className="useful-actions">
              <h6>OR</h6>
              <Link to={`/users/login`} className="btn btn-primary btn-rounded">Login</Link>
            </div>

            </div>
    );
  }
});

SignupComponent.displayName = 'Deriva.user.SignupComponent';


import { connect } from 'react-redux';
SignupComponent = connect( (state) => {
  return {}
})(SignupComponent);

export default SignupComponent;
module.exports = SignupComponent;
