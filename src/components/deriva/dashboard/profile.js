import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import TagsInput from 'react-tagsinput'

require('styles/deriva/dashboard/profile.scss');
let ProfileComponent = React.createClass({

  getInitialState() {
    return {roles: []}
  },

  handleRoleChange( roles ){
    this.setState({roles})
  },

  render() {
    return (<div className={classNames("dashboard-profile")}>
                <section className="header">
                  <h1> Profile </h1>
                </section>

                <section className="main">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" id="title" placeholder={this.props.user.name} value={this.props.user.name}/>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <TagsInput value={this.props.user.roles} onChange={this.handleRoleChange} />
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

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ProfileComponent = connect( (state) => {
  return {user: state.user}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ProfileComponent);


export default ProfileComponent;
module.exports = ProfileComponent;
