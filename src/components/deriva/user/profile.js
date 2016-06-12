'use strict';

import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import utils from 'utils/index.js';
import dataSources from 'sources/index.js';

require('styles/deriva/docs/Upload.scss');

let ProfileComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false,
             url: false,
             oembed: {title: '', author: '', html: ''}}
  },

  embed(html) {
    return {__html: html}
  },

  preview_embed(ev) {
    let url = this.refs.url.value;

    utils.oembed( url, (err, data) => {
      if(err && err.status === 500){
        this.setState({success: false, failed: true,
                       message: 'No preview available...'})
      } else if(err && err.status === 404){
        this.setState({success: false, failed: true,
                       message: 'Video not found'});
      } else {
        this.setState({success: false, failed: false,
                       url, oembed: data });
      }
    })
  },

  uploadDoc(ev) {
    // cancel form submission
    ev.preventDefault();

    let doc_props = {title: this.refs.title.value,
                     url: this.refs.url.value,
                     description: this.state.oembed.description,
                     type: this.state.oembed.type,
                     provider_name: this.state.oembed.provider_name,
                     oembed: this.state.oembed }

    let doc = new dataSources.Doc(doc_props);
    window.remote_db.put( doc ).then( () => {
      console.log('uploaddoc',doc._id, 'OK');
      this.setState({success: true, failed: false,
                     message: `Created ${doc._id}`});
    }).catch( (err) => {
      console.error('uploaddoc',err);
    });
  },



  render() {
    let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("upload-component box", signup_classes)}>
            <form onSubmit={this.uploadDoc}>
            { this.state.oembed ? (
              <div className="embed-preview"
                    dangerouslySetInnerHTML={this.embed(this.state.oembed.html)} />)
              : (<p>💢</p>) }

              <div className="url form-group">
                <input type="text" className="form-control" ref="url" id="URL" placeholder="URL"/>
                <input type="button" className="form-control" ref="preview" value="Preview" onClick={this.preview_embed} />
              </div>
              <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" ref="title" id="title" placeholder="Título" value={this.state.oembed.title}/>
              </div>
              <div className="form-group">
                <label for="author">Author</label>
                <input type="text" className="form-control" ref="author" id="author" placeholder="Autor" value={this.state.oembed.author}/>
              </div>
              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) :
                  (<div/>) }
              </div>
              <button className="btn btn-primary submit">
                Enviar ✨
              </button>
            </form>
            </div>
    );
  }
});

UploadComponent.displayName = 'Deriva.user.UploadComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default UploadComponent;
