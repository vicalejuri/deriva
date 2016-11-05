import { Router, Route, Link, browserHistory } from 'react-router';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

/* App */
import LoginComponent from 'components/deriva/user/inline/login.js';
import LoggedInComponent from 'components/deriva/user/inline/loggedin.js';

import {ChannelSelect} from 'components/deriva/channels/ChannelSelect.js';
import Emoji from 'components/ui/Emoji.js';

/*
 * The header with support for popover
 */
let HeaderComponent = React.createClass({
  getInitialState() {
    return {popover_link: false, login_popover_active: false}
  },

  componentDidMount(){
    require('styles/deriva/Header.scss');
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

  /* Go to link href route */
  goTo(e) {
    let target = e.target;
    if( _.includes(target.classList,'icon')){
      target = target.parentNode;
    }

    let uri = target.getAttribute('href');
    browserHistory.push(uri);
  },

  render() {
    let menu_popover_classes  = { 'menu-popover': true,
                                  'active': this.state.login_popover_active };
    let header_float = {'floated': this.props.ui_header.floated}
    return (
        <header className={classNames('toolbar','toolbar-header','header-nav', header_float)}>
          <div className="logo">
            <Link to={`/`} >
              <Emoji>🉑deriva</Emoji>
            </Link>
          </div>

          <div className="featured">
            {/* <ChannelSelect ref='channel_select' /> */}
          </div>

          <div className="nav toolbar-actions">

            <a onClick={this.toggleLogin} className="pull-right">
              Login
            </a>


            {/*
            <div className="btn-group" onClick={this.goTo}>
              <button className="btn btn-default " href="/docs/upload">
                <span className="icon icon-plus" ></span>
                Upload
              </button>
            </div>
            */}
          </div>


          <div onMouseLeave={this.togglePopoverLinks} className={classNames('anim-fadeIn',menu_popover_classes)}>
            {(this.props.user.authenticated ?
              (<LoggedInComponent ref="loggedin_popover" active={menu_popover_classes.active} />) :
              (<LoginComponent ref="login_popover" active={menu_popover_classes.active} />) )}
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
  return {user: state.data.user,
          ui_header: state.ui.header}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(HeaderComponent);

export default HeaderComponent;
