import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

import actions from 'actions';
require('styles/deriva/dashboard/collection/list.scss');


//         <td><Link to={`/dashboard/collection/channels/edit/${doc.id}`} >{doc.id}</Link></td>


/*
 * Show a list , one per row of the given model.
 *
 *    doc_type: document type string eg: 'deriva/doc',
 *    model:    a reference to the model class
 *
 *    actions: Actions Creators to be called on INSERT, FIND, REMOVE calls
 *
 *        eg: {INSERT: tal, REMOVE: tal, FIND: tal}
 *
 *
 *    filter: properties of the model to display.
 *    exclude: properties of the model to hide.
 */
let CollectionComponent = React.createClass({
  getDefaultProps(){
    return {doc_type: 'deriva/doc', model: function(){ return {id: 0, type: 'notype',title: 'no model'}},
            filter: {'id': true}, exclude: [], tools: [],
            actions: {INSERT: _.wrap( actions.pouch.insert , (action, args) => {
                                        action(window.db, actions.pouch.INSERT,  'deriva/doc',...args);
                           }),
                           REMOVE: _.wrap( actions.pouch.remove , (action, args) => {
                                        action(window.db, actions.pouch.REMOVE,  'deriva/doc', ...args);
                           }),
                           FIND:   actions.pouch.find(window.db, actions.pouch.FIND,      'deriva/doc') }}
  },
  getInitialState(){
    return {document_list: []}
  },
  componentWillReceiveProps( nextProps) { },

  remove( ){
    let checked_rows = (this.state.document_list.filter( (doc, i) => {
      let dom_el = this.refs.doc[i];
      return (dom_el.state.checked == true);
    }));
    checked_rows.forEach( (doc,i) => {
      this.props.dispatch( this.props.actions.REMOVE( doc ) );
    });
  },

  find_all(){
    this.props.dispatch( this.props.actions.FIND() ).then( (docs) => {
      this.setState({document_list: docs});
    }).catch( (err)=> {
      console.error("Could not FIND documents of type ", this.props.doc_type);
      console.trace(err);
    });
  },

  edit( doc ) {
    browserHistory.push( `/dashboard/collection/${this.props.doc_type}/edit/${doc.id}/` );
  },

  componentWillMount(){
    this.find_all();
  },


  render() {
    let { model , filter, exclude , ...rest} = this.props;

    // filter and exclude shit
    var fields = filter;
    if( _.isObject(filter)){
      fields = _.toPairs( filter );
    } else {
      fields = _.toPairs(new model()).reject((f) => { return f[0].match(/_.*?/); });
    }
    fields = _.reject( fields, (f) => { return exclude.indexOf(f[0]) !== -1 } );

    console.log( this.props.tools );

    return (<div className={classNames("dashboard-page list",this.props.doc_type)}>

              <h1>COLLECTION : {this.props.doc_type}</h1>
              <section className="actions">
                <div className="btn-group">
                  <button className="btn btn-default" onClick={this.remove}>
                    <span className="icon icon-trash"></span>
                    Delete
                  </button>

                  <Link to={`/dashboard/collection/${this.props.doc_type}/edit/`} className="btn btn-default">
                    <span className="icon icon-plus-circled"> </span>
                     Add new
                  </Link>
                </div>

                <section className="tools">
                  {this.props.tools}
                </section>

              </section>

              <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  {_.keys(this.props.filter).map( (v) => {
                    return (<td>{v}</td>)
                  })}
              </tr></thead>
              <tbody>
                {this.state.document_list.map( (doc, i) =>
                  <ChannelRow ref={`doc[${i}]`} key={doc.id}
                              doc={doc} fields={fields}
                              onMark={this.edit} {...rest} />
                )}
              </tbody>
            </table>
          </div>
    );
  }
});

CollectionComponent.displayName = 'Deriva.dashboard.collection.collection';


/*
 * Single row
 */
let ChannelRow = React.createClass({
  propTypes: {
    channel: React.PropTypes.object.isRequired,
    onMark: React.PropTypes.func.isRequired
  },

  getInitialState(){
    return {checked: false};
  },

  check(ev){
    let cbox = this.refs.checkbox;

    cbox.checked = !cbox.checked;
    this.setState({checked: cbox.checked});
    this.props.onMark( this.props.doc );
  },

  render(){
    let { doc_type, doc , fields } = this.props;

    return (
      <tr className={classNames(this.state)} onClick={this.check}>
          <td><input type="checkbox" ref="checkbox" className="checkbox" onClick={this.check} checked={this.state.checked}/></td>
          {fields.map( ([label, attr]) =>
            (<td>{ _.isFunction(attr) ? attr(doc) : doc[label] } </td>)
          )}
      </tr>);
  }
});

export default CollectionComponent;
module.exports = CollectionComponent;
