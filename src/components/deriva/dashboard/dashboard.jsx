import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import actions from 'actions';

/*
 * A dashboard is a two columns layout
 * with a let menu controlling the main page
 * used by child admin pages
 *
 * props( sidebar, main, [righbar])
 */
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
            settings: shouldShow
          }};
  },

  componentWillMount(){
    require('styles/deriva/dashboard/dashboard.scss');

    this.props.dispatch( actions.ui.set_ui_property('header.floated', false ) );
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
                  {(this.props.user.authenticated &&
                    this.props.user.roles.indexOf('_admin') !== -1
                  ? (<span className="nav-group-item" href="#">
                      <Link to="/dashboard/collection/user">
                        <span className="icon icon-database"></span>
                        Users
                      </Link>
                    </span> )
                    : false
                   )}
                  <span className="nav-group-item" href="#">
                    <Link to="/dashboard/collection/doc">
                      <span className="icon icon-database" ></span>
                      Docs
                    </Link>
                  </span>
                  <span className="nav-group-item" href="#">
                    <Link to="/dashboard/collection/channel">
                    <span className="icon icon-database" ></span>
                      Channels
                    </Link>
                  </span>

                </nav>

                <nav className={classNames("nav-group", this.state.navs.settings)}>
                  <h5 className="nav-group-title" >
                    <Link to="/dashboard/settings">
                      <span className="icon icon-record" style={{"color":"#fc605b"}}> </span>
                      Settings
                    </Link>
                  </h5>
                  {/*
                  <span className="nav-group-item" href="#">
                    <span className="icon icon-record" style={{"color":"#fc605b"}}></span>
                    Theme
                  </span>
                  <span className="nav-group-item" href="#">
                    <span className="icon icon-record" style={{"color":"#fdbc40"}}></span>
                    Engine
                  </span>
                  */}
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
import { connect } from 'react-redux'

DashboardComponent = connect( (state) => {
  return {user: state.data.user}
})(DashboardComponent);

export default DashboardComponent;
module.exports = DashboardComponent;
