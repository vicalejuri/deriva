import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import ItemBox from 'components/ui/ItemBox.js';
import actions from 'actions'

require('styles/deriva/dashboard/collection/docs/_import.scss');
let ImportDocComponent = React.createClass({

  getInitialState() {
    return {files: [], documents: [],
            error: false, message: ''}
  },

  /*
   * Create a document from a raw json
   *
   * Only allow if oembed is successfull
   */
  createDoc(json) {
    return new Promise( (resolve,reject) => {

      let props = {title: (json.message || json.description),
                   url: (json.link || json.source),
                   description: (json.description || json.message)}

      this.props.dispatch( actions.oembed( props.url ) ).then((oembed) => {
        let fprops = _.merge(props, {type: oembed.type,
                                    provider_name: oembed.provider_name,
                                    oembed: oembed } );
        let ndoc = new window.dataModels.Doc(fprops);

        return resolve(ndoc);
      }).catch( (err) => {
        console.error(err);
        console.trace();
        return reject(err);
      });

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

        /* Filter valid documents from raw json */
        return json.data.filter( (doc) => {
          let allowed = !(
            ( _.isEmpty( doc.message || doc.description) )  ||
            ( _.isEmpty(doc.link || doc.source) )  );
          return allowed;
        /* Transform it to a document model */
        }).map( (doc, i) => {
          this.createDoc(doc).then( (fdoc) => {
            let old_documents = this.state.documents;
            this.setState({documents: _.union(old_documents,[fdoc])})
          })
        });
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


    let insertDocs = (documents) => {
      return Promise.all(
        documents.map(
          this.props.dispatch( actions.docs.insert_doc)
        )
      );
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
                  <ul className="list-group">
                  {this.state.documents.map( (doc,i) =>
                      <li key={i} className="list-group-item">
                        <img className="img-circle media-object pull-left" src={doc.oembed.thumbnail_url} width="32" height="32" />
                        <div className="media-body">
                          <strong>{doc.url}</strong>
                          <p>{doc.title}</p>
                        </div>
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
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ImportDocComponent = connect( (state) => {
  return {}
})(ImportDocComponent);

export default ImportDocComponent;
module.exports = ImportDocComponent
