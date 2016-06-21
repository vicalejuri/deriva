import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

require('styles/deriva/dashboard/profile.scss');
let ProfileComponent = React.createClass({

  render() {
    return (<div className={classNames("dashboard-profile")}>
                <section className="header">
                  <h1> Profile </h1>
                </section>

                <section className="main">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" id="title" placeholder="{name}" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select className="form-control" id="role">
                      <option>Option one</option>
                          <option>Option two</option>
                          <option>Option three</option>
                          <option>Option four</option>
                          <option>Option five</option>
                          <option>Option six</option>
                          <option>Option seven</option>
                          <option>Option eight</option>
                      </select>
                    </div>
                </section>

                <section className="footer">
                  <button className="btn btn-large btn-primary submit">Salvar ✨</button>
                </section>
            </div>
    );
  }

});

ProfileComponent.displayName = 'Deriva.dashboard.ProfileComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default ProfileComponent;
module.exports = ProfileComponent;
