import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import ItemBox from 'components/ui/ItemBox.js';

require('styles/deriva/dashboard/collection/docs/_import.scss');
let ImportDocComponent = React.createClass({

  getInitialState() {
    return {files: [], documents: [],
            error: false, message: ''}
  },

  mapJSONToDoc(raw_json) {
    /* Filter valid documents from raw json */
    return raw_json.data.filter( (doc) => {
      let allowed = !(
        ( _.isEmpty( doc.message || doc.description) )  ||
        ( _.isEmpty(doc.link || doc.source) )  );
      return allowed;
    /* Transform it to a document model */
    }).map( (doc, i) => {
      let props = {title: (doc.message || doc.description),
                   url: (doc.link || doc.source),
                   description: (doc.description || doc.message)}

      /*
        this.type = params.type
        this.provider_name = params.provider_name
        this.oembed = params.oembed;
      */
      let ndoc = new window.dataModels.Doc(props);
      return ndoc;
    });
  },

  /*
   * Read a local json file {data: [{doc1}, ... ]}
   *   transform to a document model
   *   and store in state.documents
   */
  importJSONFile(ev) {
    let files = ev.target.files;

    for(let i=0, f; f = files[i]; i++){
      let reader = new FileReader();
      reader.onload = (e) => {
        let raw_json = e.target.result;
        let json = JSON.parse(raw_json);

        let old_documents = this.state.documents;
        let newest_documents = this.mapJSONToDoc(json);
        this.setState({documents: _.union(old_documents,newest_documents),
                       message: ``})
      }

      reader.readAsText(f);
    }

    this.setState({files: _.toArray(files), message: 'Loading...'})
  },

  /*
   * Save in PouchDB
   */
  save(e){
    e.preventDefault();


    let insertDocs = function(documents) {
      return Promise.all( documents.map( this.props.actions.insert_doc) );
    }

    insertDocs(this.state.documents).done( (results) => {
      this.setMessage({error: false, message: `${results.length} imported`})
    }, (err) => {
      console.error('insert doc', err);
      this.setMessage({error: true, message: err})
    });
  },

  render() {
    return (
            <ItemBox className="box import" title="Import FB Feed">
              <section className="item-content">
                <input ref="files" name="files[]" type="file" multiple
                      onChange={this.importJSONFile} placeholder="JSON Feed"/>
                <div className="info">
                  <p>
                    <b>Loaded {this.state.documents.length}</b> documents
                  </p>
                  <p>{this.state.message}</p>
                  <ul className="list">
                  {this.state.documents.map( (doc,i) =>
                      <li key={i}>
                        <a href={doc.url}>{doc.title}</a>
                      </li>
                  )}
                  </ul>
                </div>
              </section>
              <section className="item-actions">
                <button className="btn btn-primary btn-large" onClick={this.save}>Import!</button>
              </section>
            </ItemBox>
            );
  }
});

ImportDocComponent.displayName = 'Deriva.dashboard.collection.docs.ImportDocComponent';

// redux
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
ImportDocComponent = connect( (state) => {
  return {}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ImportDocComponent);

export default ImportDocComponent;
module.exports = ImportDocComponent
