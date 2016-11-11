import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory } from 'react-router';
import classNames from 'classnames';

import actions from 'actions';

require('styles/deriva/dashboard/list.scss');

/*
 * Single rows
 */
let UserRow = React.createClass({
  propTypes: {
    doc: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return {checked: false};
  },

  check(ev){
    let cbox = this.refs.checkbox;

    cbox.checked = !cbox.checked;
    this.setState({checked: cbox.checked});
  },

  render(){
    let { user } = this.props;

    return (<tr className={classNames(this.state)} onClick={this.check} ref="tr">
      <td><input type="checkbox" ref="checkbox" className="checkbox" onClick={this.check} checked={this.state.checked}/></td>
      <td><Link to={`/dashboard/users/${user.name}`} >{user._id}</Link></td>
      <td>{user.name}</td>
      <td>{user.roles.length > 0 && user.roles || 'Anonymous'}</td>
      <td>{user.email || 'no email'}</td>
    </tr>);
  }
});



/*
 * Table listing every document
 */
let ListUsersComponent = React.createClass({
  getInitialState() {
    return {actions: {active: false,
                      default_url: '/dashboard/users/list',
                      url: location.pathname},
            users: []}
  },

  componentDidMount( ) {
    this.props.dispatch( actions.user.admin_list_users() )
    .then( (all_users) => {
      this.setState({users: all_users});
    });
  },

  myremove( ){
    console.log('remove')
    let checked_rows = (this.props.user.filter( (u, i) => {
      let dom_el = this.refs[`u[${i}]`];
      return (dom_el.state.checked == true);
    }));
    console.log(checked_rows);
    checked_rows.forEach( (user,i) => {
      this.props.dispatch( actions.user.delete( user ) );
    })
  },

  toggle_actions( e ){

    let link = e.target;
    let url =  link.getAttribute('href');

    // Toggle on/off
    // if clicked link is the same url
    // otherwise just show the url
    let is_active = this.state.actions.active
    if(is_active){
      if(url == this.state.actions.url){
        url = this.state.actions.default_url;
      }
    }

    e.preventDefault();
    browserHistory.push( url )
    this.setState( {actions:  {active: !is_active,
                               url: url  ,
                               default_url: this.state.actions.default_url}})
  },

  render() {
    return (<div className="list-page users">

              <section className="actions">
                <div className="btn-group">
                  <button className="btn btn-default" onClick={this.myremove}>
                    <span className="icon icon-trash"></span>
                    Delete
                  </button>

                  <Link to="/dashboard/collection/docs/upload" className="btn btn-default"
                    onClick={this.toggle_actions}>
                    <span className="icon icon-plus-circled"></span>
                    Add New
                  </Link>
                </div>

                <div className="btn-group">
                  <Link to="/dashboard/collection/docs/" className="btn btn-default"
                    onClick={this.toggle_actions}>
                    <span className="icon icon-list"></span>
                  </Link>
                </div>

              </section>

              {/*
              <section className="tools">
                <ImportDocComponent type="fb_feed_json"
                className={classNames({enabled: this.state['tools.import']})}
                />
              </section>
              */}

          {(this.state.users && this.state.users.length > 0
            ? (
            <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  <th>id</th>
                  <th>name</th>
                  <th>roles</th>
                  <th>Email</th>
              </tr></thead>
              <tbody>
                { this.state.users.map( (user, i) =>
                  <UserRow ref={`user[${i}]`} user={user} key={user.id} />
                )}
              </tbody>
            </table>
          ) :
            (<p>No users</p>)
          )}
          </div>
    );
  }
});

ListUsersComponent.displayName = 'Deriva.ListUsersComponent';

// Connect to redux store
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

ListUsersComponent = connect( (state) => {
  return {}
})(ListUsersComponent);


export default ListUsersComponent;
module.exports = ListUsersComponent
