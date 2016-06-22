import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link } from 'react-router';

require('styles/deriva/dashboard/list.scss');
let ListDocsComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },

  /* Select */
  check( ev ) {
    var target = ev.target;

    let alldocs = _(this.props.docs);

    this.props.actions.delete_doc( target.value )
  },

  checkAll(ev){
    //ReactDOM.findDOMNode()
    console.log("check all");
  },

  remove( ){

  },

  render() {
    return (<div className="list-page docs">
              <section className="header">
                <h1> All Docs </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.docs.length}</strong></div>
                <button className="btn btn-default" onClick={this.remove}>
                  <span className="icon icon-minus-circled"></span>
                </button>
              </section>
              <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  <th>id</th>
                  <th>title</th>
                  <th>url</th>
              </tr></thead>
              <tbody>
                {this.props.docs.map( (doc, i) =>
                  <tr key={i} onClick={this.check}>
                    <td><input type="checkbox" className="checkbox" value={doc._id} onClick={this.check} /></td>
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
