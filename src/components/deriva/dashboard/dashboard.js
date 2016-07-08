import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

require('styles/deriva/dashboard/dashboard.scss');
let DashboardComponent = React.createClass({
  render() {
    let { sidebar, main, children, params } = this.props

    return (<div className={classNames("pane-group","dashboard")}>
              <section className="pane pane-sm sidebar">
                <nav className="nav-group">
                  <h5 className="nav-group-title"> <Link to="/dashboard/profile"> Profile </Link> </h5>
                </nav>
                <nav className="nav-group">
                  <h5 className="nav-group-title">
                    <Link to="/dashboard/profile"> Collection </Link>
                  </h5>
                  <span className="nav-group-item" href="#">
                    <Link to="/dashboard/collection/docs">
                      <span className="icon icon-database" ></span>
                      Docs
                    </Link>
                  </span>

                  <span className="nav-group-item" href="#">
                    <span className="icon icon-database" ></span>
                    Users
                  </span>

                </nav>

                <nav className="nav-group">
                  <h5 className="nav-group-title" ><Link to="/dashboard/">Settings</Link></h5>
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
            </div>
    );
  }
});

DashboardComponent.displayName = 'Deriva.dashboard.DashboardComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default DashboardComponent;
module.exports = DashboardComponent;
