require('normalize.css/normalize.css');
require('styles/App.scss');

import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

let yeomanImage = require('../assets/yeoman.png');
export let DefaultComponent = React.createClass({
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Default component</div>
      </div>
    );
  }
});

/* App */
import WatchDoc from 'components/deriva/WatchDoc.js';
import ListDoc from 'components/deriva/ListDoc.js';
import LoginComponent from 'components/deriva/user/login.js';

let AppComponent = React.createClass({
  getInitialState() {
    return {popover_link: false, login_popover_active: false};
  },

  toggleLogin(ev) {
    this.togglePopoverLinks( ev.target );
  },

  togglePopoverLinks( link ) {
    let is_activated = !this.state.login_popover_active;

    // remove previous active link
    if(this.state.popover_link){
      this.state.popover_link.classList.remove('popover-active');
    }

    // Only add class if is activated
    if(is_activated){
      link.classList.add('popover-active');
      this.setState({popover_link: link});
    }
    
    // anyway, show/hide popover
    this.setState({login_popover_active: is_activated});
  },

  render() {
    let menu_popover_classes  = { 'menu-popover': true,
                                  'active': this.state.login_popover_active };
    return (
      <div id="app">
        <header className="header-nav">
          <div className="logo" side="left">
            <h1><a href="/">deriva</a></h1>
          </div>
          <div className="nav" side="right">
            <Link to="#" onClick={this.toggleLogin}>Login</Link>
            <Link to="/signup">Sign up</Link>

            <Link to="/upload">+</Link>
            <Link to="/watch">watch</Link>
            <Link to="/list">All Docs</Link>
          </div>
          <div className={classNames(menu_popover_classes)}>
            <LoginComponent ref="login_popover" />
          </div>
        </header>
        <div className="canvas">
          {this.props.children}
        </div>
      </div>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
