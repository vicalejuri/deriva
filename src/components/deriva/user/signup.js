'use strict';

import React from 'react';
import Parse from 'parse';

import {  Link } from 'react-router';

require('styles/deriva/user/signup.scss');

let SignupComponent = React.createClass({
  getDefaultProps() {
    return { username: ''}
  },

  render() {
    return (<div className="signup-component bordered">
              <div className="title">
                <h1>$ 1/mês</h1>
                <p>Faça uma doação</p>
              </div>
              <div> <input type="text" id="Email" placeholder="Email"/>
              </div>
              <div> <input type="text" id="username" placeholder="Usuário"/>
              </div>
              <div><input type="password" id="password" placeholder="Senha"/>
              </div>
              <div className="terms">
                Eu li os  <a href="#"> Telmos de selvisso</a>.
              </div>
              <div className="submit">
                <input type="submit" ref="submit" value="Criar Conta"/>
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
