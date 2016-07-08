import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link } from 'react-router';
import classNames from 'classnames';

require('styles/deriva/dashboard/list.scss');

/*
 * Single rows
 */
let DocRow = React.createClass({
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
    let doc = this.props.doc;

    return (<tr className={classNames(this.state)} onClick={this.check} ref="tr">
      <td><input type="checkbox" ref="checkbox" className="checkbox" onClick={this.check} checked={this.state.checked}/></td>
      <td><Link to={`/docs/watch/${doc._id}`} >{doc._id}</Link></td>
      <td>{doc.data.title}</td>
      <td>{doc.data.url}</td>
    </tr>);
  }
});



/*
 * Table listing every document
 */
let ListDocsComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },

  check( doc_id, doc ){
    //ReactDOM.findDOMNode()
    //console.log("check all", $$);
  },

  remove( ){
    let checked_rows = (this.props.docs.filter( (doc, i) => {
      let dom_el = this.refs[`doc[${i}]`];
      return (dom_el.state.checked == true);
    }));
    checked_rows.forEach( (doc,i) => {
      console.log(doc);
      this.props.actions.delete_doc( doc );
    })
  },

  render() {
    return (<div className="list-page docs">
              <section className="header">
                <h1> All Docs </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.docs.length}</strong></div>

                <div className="btn-group">
                  <button className="btn btn-default" onClick={this.remove}>
                    <span className="icon icon-trash"></span>
                  </button>

                  <Link to="/docs/upload" className="btn btn-default">
                    <span className="icon icon-plus-circled"></span>
                  </Link>
                </div>

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
                  <DocRow ref={`doc[${i}]`} doc={doc} key={doc._id} />
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
