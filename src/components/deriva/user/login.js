'use strict';

import React from 'react';
import Parse from 'parse';

import {  Link } from 'react-router';

require('styles/deriva/user/login.scss');

let LoginComponent = React.createClass({
  getDefaultProps() {
    return { username: ''}
  },

  render() {
    return (<div className="login-component">
             <div>
                { /*<label for="username">Username:</label> */ }
                  <input type="text" id="username" placeholder="Usuário"/>
             </div>
             <div>
              {/*<label for="password">Password: </label>*/}
              <input type="password" id="password" placeholder="Senha"/>
             </div>
             <div className="submit">
              <input type="submit" ref="submit" value="Acessar >"/>
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
