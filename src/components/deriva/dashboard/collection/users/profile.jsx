import React from 'react';

import {  Link } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'

import actions from 'actions'

require('styles/deriva/dashboard/profile.scss');
let ProfileComponent = React.createClass({
  /*
   * Render a user profile given it userName.
   *
   * if editable is true, data will be rendered
   * as a form, ready to edit.
   *  Otherwise, render as a public view of profile.
   */
  propTypes: {
    userName: React.PropTypes.string,
    editable: React.PropTypes.bool
  },

  getInitialState() {
    let userName =  (this.props.params.userName || 0);

    return {userName,
           roles: [], user: {roles: [], name: '', email: ''},
           error: false}
  },

  getUser( userName ){
    this.props.dispatch( actions.user.getUser( userName )).then( (user) => {
      this.setState({user: user, userName})
    }).catch( (error) => {
      this.setState({error: true, user: {}});
    });
  },

  componentWillReceiveProps( nextProps ) {
    let userName = ( nextProps.params.userName || 0);
    this.getUser( userName );
  },

  componentWillMount() {
    console.log("profile mount", this.state.userName);
    this.getUser( this.state.userName );
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
    return (<div className={classNames("list-page","dashboard-profile", {error: this.state.error})}>
                <section className="header">
                  <h1> Profile </h1>
                </section>

                {(this.state.error
                ?(<h5>User {this.state.userName} not found</h5>)
                :(<section className="main">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" id="title" placeholder={this.state.user.name} value={this.state.user.name}/>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" id="email" placeholder="Email" value={this.state.user.email}/>
                    </div>

                    {(this.props.yourself.roles.indexOf('_admin') >= 0
                      ?(<div className="form-group">
                        <label>Role</label>
                        <TagsInput ref="role" renderInput={this.rolesSuggestion} value={this.state.user.roles}  onChange={this.handleRoleChange}  />
                       </div>)
                      : false
                    )}
                 </section>
                ))}

                 <section className="footer">
                  <button className="btn btn-large btn-primary submit">Salvar ✨</button>
                 </section>

            </div>
    );
  }

});

ProfileComponent.displayName = 'Deriva.dashboard.collection.users.ProfileComponent';

// Connect to redux store
import { connect } from 'react-redux'

ProfileComponent = connect( (state) => {
  return {yourself: state.data.user}
})(ProfileComponent);

export default ProfileComponent;
module.exports = ProfileComponent;
