import React from 'react';
import _ from 'lodash'

import {  Link } from 'react-router';

require('styles/deriva/docs/List.scss');

let ListDocsComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },

  render() {
    return (<div className="list-page">
              <h1> All Docs </h1>
              <table className="list-component table-striped">
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

ListDocsComponent.displayName = 'Deriva.ListDocsComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ListDocsComponent = connect( (state) => {
  return {docs: state.docs}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ListDocsComponent);


export default ListDocsComponent;
module.exports = ListDocsComponent
