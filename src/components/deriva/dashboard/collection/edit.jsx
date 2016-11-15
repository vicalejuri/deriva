
import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import actions from 'actions';

import ItemBox from 'components/ui/item-box.jsx';
import ModelForm from 'components/ui/model-form';

require('styles/deriva/dashboard/collection/edit.scss');

/*
 * A editable component to edit given doc_type/model
 *
 */
let EditComponent = React.createClass({

  getDefaultProps(){
    return {doc_type: 'deriva/doc', model: function(){ return {id: 0, type: 'notype',title: 'no model'}},
            filter: {'id': true}, exclude: [],
            actions: {INSERT: _.wrap( actions.pouch.insert , (action, args) => {
                                        action(window.db, actions.pouch.INSERT,  'deriva/doc',...args);
                           }),
                           REMOVE: _.wrap( actions.pouch.remove , (action, args) => {
                                        action(window.db, actions.pouch.REMOVE,  'deriva/doc', ...args);
                           }),
                           FIND:   actions.pouch.find(window.db, actions.pouch.FIND,      'deriva/doc') }}
  },

  /*
   * A smart edit component, edit Channel Models
   */
  getInitialState() {
    console.log("Edit, wooo", this.props );
    let doc_id = ( this.props.params.doc_id || false);

    let empty_doc  = new this.props.model();
    return { submit: {status: 0, message: ''} ,
             doc: empty_doc, doc_id: doc_id };
  },

  componentWillReceiveProps( nextProps ) {
    let doc_id = (nextProps.params.doc_id  || false);
    this.getDocument( doc_id );
  },


  createDocument(ev) {
    // cancel form submission
    ev.preventDefault();

    let form_data = this.refs.model_form.value();
    console.log("Saving", form_data);
    let new_doc = new this.props.model( form_data );

    this.props.dispatch( this.props.actions.INSERT( new_doc ) ).then( (new_doc) => {
      this.setState({doc: new this.props.model( new_doc ),
                     doc_id: new_doc.id,
                     submit: {status: 1, message: `Saved '${new_doc.id} !`}});
    }).catch( (err) => {
      this.setState({submit: err});
    });
  },

  /*
   * Given a document, retrieve it,
   * or create a new empty one
   */
  getDocument( doc_id ){
    let clean_message = {submit: {status: 0, message: ''}};

    if( doc_id ){
      this.props.dispatch( this.props.actions.FIND( doc_id) ).then( (doc) => {
        this.setState({doc_id, doc, ...clean_message});
      });
    } else {
      let doc = new this.props.model();
      this.setState({doc_id, doc, ...clean_message});
    }
  },

  componentWillMount(){
    this.getDocument( this.state.doc_id );
  },

  render() {
    let is_edit = (this.state.doc_id !== false);
    let success = (this.state.submit.status);
    let { doc } = this.state;
    return (
      <ItemBox className={classNames("box edit-component", (is_edit ? 'edit' : 'new'))}
               title={(is_edit ? `Edit #${doc.id}` : "Create ")}
               return_to="/dashboard/collection/channel/" >
        <section className="item-content">

            <ModelForm ref="model_form" model={this.props.model} data={doc} >
            </ModelForm>

        </section>
        <section className="item-actions">
          <p>{this.state.submit.message}</p>
          <button className="btn btn-primary btn-large" onClick={this.createDocument}>Submit ✨</button>
        </section>
      </ItemBox>
    );
  }
});

EditComponent.displayName = 'Deriva.dashboard.collection.EditComponent';


export default EditComponent;
module.exports = EditComponent;
