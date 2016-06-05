require('styles/Header.scss');

import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

/* App */
import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
import UploadDoc from 'components/deriva/docs/UploadDoc.js';
import LoginComponent from 'components/deriva/user/login.js';
/*
 * The header with support for popover
 */
let HeaderComponent = React.createClass({
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
    );
  }
});

HeaderComponent.defaultProps = {
};

export default HeaderComponent;
