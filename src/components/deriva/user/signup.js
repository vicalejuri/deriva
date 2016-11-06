import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

let SignupComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false, invite: 'empty'}
  },

  ComponentDidMount(){
    require('styles/deriva/user/signup.scss');
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
    //let metadata = {email: this.refs.email.value};

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
    return (<div className={classNames("signup-component page-column box", signup_classes)}>
            <form onSubmit={this.signUp}>
              <div className="title">
                <h1>DERIVA</h1>
                <div className="sub-box">
                  <p>Only invited users</p>
                  <input id="invite" ref="invite" type="text" onBlur={this.isValidInvite}
                  className={classNames("form-control","bordered", this.state.invite)} placeholder="Invite password" />
                </div>
              </div>
            <div className="flex-column form-group signup">
              <div>
                <label for="username">Usuário</label>
                <input type="text" className="form-control bordered" ref="username" autocomplete="username" id="username" placeholder="Usuário"/>
              </div>
              <div>
                <label for="password">Senha</label>
                <input type="password" className="form-control bordered" ref="password" autocomplete="password" id="password" placeholder="Senha"/>
              </div>
            </div>
              <div className="terms checkbox">
              { this.state.message ? (<p>{this.state.message}</p>) :
                (<label>
                    Nós não fazemos <a href="#">tracking</a>, nem guardamos informações pessoais.
                </label>)
              }
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

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default SignupComponent;
module.exports = SignupComponent;
