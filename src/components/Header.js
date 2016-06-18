import { Router, Route, Link, browserHistory } from 'react-router';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

/* App */
import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
import UploadDoc from 'components/deriva/docs/UploadDoc.js';
import LoginComponent from 'components/deriva/user/login.js';
import ProfileComponent from 'components/deriva/user/profile.js';

require('styles/deriva/Header.scss');

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

  goTo(e) {
    let target = e.target;
    if( _.includes(target.classList,'icon')){
      target = target.parentNode;
    }

    let uri = target.getAttribute('href');
    browserHistory.replace(uri);
  },

  render() {
    let menu_popover_classes  = { 'menu-popover': true,
                                  'active': this.state.login_popover_active };
    return (
        <header className="toolbar toolbar-header header-nav">
          <div className="logo" side="left">
            <Link to={`/`} >
              <h1 className="title">deriva</h1>
            </Link>
          </div>
          <div className="nav toolbar-actions" side="right">
            <button onClick={this.toggleLogin} className="btn btn-default btn-dropdown pull-right">
              <span className="icon">👴</span>
            </button>

            <div className="btn-group" onClick={this.goTo}>
              <button className="btn btn-default" href="/list">
                <span className="icon icon-home"></span>
              </button>
              <button className="btn btn-default" href="/live/record">
                <span className="icon icon-record"></span>
              </button>
              <button className="btn btn-default " href="/upload">
                <span className="icon icon-plus" ></span>
                Upload
              </button>
            </div>

          </div>
          <div onMouseLeave={this.togglePopoverLinks} className={classNames('anim-fadeIn',menu_popover_classes)}>
          {(this.props.user.authenticated ?
            (<ProfileComponent ref="profile_popover" />) :
            (<LoginComponent ref="login_popover" />) )}
          </div>

          <div className="toolbar-actions">
           </div>
        </header>
    );
  }
});

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

HeaderComponent = connect( (state) => {
  return {user: state.user}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(HeaderComponent);

export default HeaderComponent;
