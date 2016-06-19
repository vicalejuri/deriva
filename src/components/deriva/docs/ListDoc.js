'use strict';

import React from 'react';
import _ from 'lodash'

import {  Link } from 'react-router';

require('styles/deriva/docs/List.scss');

let ListComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },

  render() {
    return (<div className="list-page">
              <h3> All Doxs </h3>
              <table className="list-component">
              <thead><tr>
                  <th>id</th>
                  <th>title</th>
                  <th>url</th>
              </tr></thead>
              <tbody>
                {this.props.docs.map( (doc, i) =>
                  <tr key={i}>
                    <td><Link to={`/docs/watch/${doc._id}`} >{doc._id}</Link></td>
                    <td>{doc.data.title}</td>
                    <td>{doc.data.url}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    );
  }
});

ListComponent.displayName = 'Deriva.ListComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ListComponent = connect( (state) => {
  console.log('listComponent:connect' , state);
  return {docs: state.docs}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ListComponent);


export default ListComponent;
module.exports = ListComponent
