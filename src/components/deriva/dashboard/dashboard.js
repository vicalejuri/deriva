import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

require('styles/deriva/dashboard/dashboard.scss');
let DashboardComponent = React.createClass({

  isViewportBigEnough(){
    let width = document.body.clientWidth;

    /* $smalltablet-size */
    let show = false;
    if(width >= 481){
      show = true;
    }

    return {show}
  },

  getInitialState(){
    let shouldShow = this.isViewportBigEnough();
    return {navs: {
            collections: shouldShow,            profile: shouldShow,
            settings: shouldShow,
          }};
  },

  componentWillMount(){
    this.props.actions.set_ui('header.floated', false );
  },

  toggleNavGroup( nav_ref ){
    if(! _.has(this.state.navs,nav_ref)){
      console.error("nav group ", nav_ref, " is invalid. Maybe you mispelled?");
      console.dir( this.state.navs);
      return;
    }

    return (ev) => {
      ev.preventDefault();
      this.setState(_.merge({}, this.state,
                             {navs: {[nav_ref]: {show: !this.state['navs'][nav_ref].show}}}));
    }
  },

  render() {
    let { sidebar, main, rightbar, children, params } = this.props

    let rightbar_klass = classNames('rightbar', (!rightbar ? 'empty' : ''));
    return (<div className={classNames("pane-group","dashboard",{has_rightbar: rightbar})}>
              <section className="pane pane-sm sidebar">
                <nav className={classNames("nav-group", this.state.navs.profile)} >
                  <h5 className="nav-group-title">
                    <Link to="/dashboard/profile">
                    <span className="icon icon-user" > </span>
                    Profile</Link>
                  </h5>
                </nav>
                <nav className={classNames("nav-group", this.state.navs.collections)} >
                  <h5 className="nav-group-title">
                  <Link to="/dashboard/profile" onClick={this.toggleNavGroup('collections')}>
                    <span className="icon icon-flag" > </span>
                    Collections
                  </Link>
                  </h5>
                  <span className="nav-group-item" href="#">
                    <Link to="/dashboard/collection/docs">
                      <span className="icon icon-database" ></span>
                      Docs
                    </Link>
                  </span>
                  <span className="nav-group-item" href="#">
                    <Link to="/dashboard/collection/channels">
                    <span className="icon icon-database" ></span>
                      Channels
                    </Link>
                  </span>

                </nav>

                <nav className={classNames("nav-group", this.state.navs.settings)}>
                  <h5 className="nav-group-title" >
                    <Link to="/dashboard/" onClick={this.toggleNavGroup('settings')}>
                      <span className="icon icon-record" style={{"color":"#fc605b"}}> </span>
                      Settings
                    </Link>
                  </h5>
                  {/*
                  <span className="nav-group-item" href="#">
                    <span className="icon icon-record" style={{"color":"#fc605b"}}></span>
                    Theme
                  </span>
                  */}
                  <span className="nav-group-item" href="#">
                    <span className="icon icon-record" style={{"color":"#fdbc40"}}></span>
                    Engine
                  </span>
                </nav>
              </section>
              <section className="pane main">
                {main || <p>Choose an page from the sidebar.</p>}
              </section>
              <section className={rightbar_klass}>
                {rightbar}
              </section>
            </div>
    );
  }
});

DashboardComponent.displayName = 'Deriva.dashboard.DashboardComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

DashboardComponent = connect( (state) => {
  return {}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(DashboardComponent);

export default DashboardComponent;
module.exports = DashboardComponent;
