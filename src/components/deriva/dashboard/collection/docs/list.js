import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory } from 'react-router';
import classNames from 'classnames';

import ImportDocComponent from './_import.js';
import actions from 'actions';

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
      <td><Link to={`/docs/watch/${doc.id}`} >{doc.id}</Link></td>
      <td>{doc.title}</td>
      <td>{doc.url}</td>
    </tr>);
  }
});



/*
 * Table listing every document
 */
let ListDocsComponent = React.createClass({
  getInitialState() {
    return {actions: {active: false,
                      default_url: '/dashboard/collection/docs',
                      url: location.pathname}}
  },

  componentDidMount( ) {
    this.props.dispatch( actions.docs.list_all_doc() );
  },

  myremove( ){
    console.log('remove')
    let checked_rows = (this.props.docs.filter( (doc, i) => {
      let dom_el = this.refs[`doc[${i}]`];
      return (dom_el.state.checked == true);
    }));
    console.log(checked_rows);
    checked_rows.forEach( (doc,i) => {
      console.log('Checked: ',doc);
      this.props.dispatch( actions.docs.delete_doc( doc ) );
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
    return (<div className="list-page docs">

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

                <div className="btn-group">
                  <Link to="/dashboard/collection/docs/import" className="btn btn-default btn-warning"
                        onClick={this.toggle_actions}>
                    <span className="icon icon-facebook"></span>
                    Import json
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
              <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  <th>id</th>
                  <th>title</th>
                  <th>url</th>
              </tr></thead>
              <tbody>
                {this.props.docs.map( (doc, i) =>
                  <DocRow ref={`doc[${i}]`} doc={doc} key={doc.id} />
                )}
              </tbody>
            </table>
          </div>
    );
  }
});

ListDocsComponent.displayName = 'Deriva.ListDocsComponent';

// Connect to redux store
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ListDocsComponent = connect( (state) => {
  return {docs: state.data.docs}
})(ListDocsComponent);


export default ListDocsComponent;
module.exports = ListDocsComponent
