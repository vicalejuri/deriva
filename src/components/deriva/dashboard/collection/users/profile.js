import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'

require('styles/deriva/dashboard/profile.scss');
let ProfileComponent = React.createClass({

  getInitialState() {
    return {roles: []}
  },

  rolesSuggestion( props ){
    let allRoles = ['_admin','curator','user'];

    return (
     <Autosuggest
          ref={props.ref}
          suggestions={allRoles}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={props}
          onSuggestionSelected={(e, {suggestion}) => {
            console.log("selected role", suggestion);
            this.refs.role.addTag(suggestion);
          }}
        />
    )
  },

  handleRoleChange( roles ){
    this.setState({roles})
  },

  render() {
    return (<div className={classNames("list-page","dashboard-profile")}>
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
                      <input type="text" className="form-control" id="email" placeholder="Email" value={this.props.user.email}/>
                    </div>

                    {(this.props.user.roles.indexOf('admin') >= 0 ?
                    (<div className="form-group">
                      <label>Role</label>
                      <TagsInput ref="role" renderInput={this.rolesSuggestion} value={this.props.user.roles} onChange={this.handleRoleChange} />
                    </div>) : ('')
                    )}
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
  return {user: state.data.user}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ProfileComponent);


export default ProfileComponent;
module.exports = ProfileComponent;
