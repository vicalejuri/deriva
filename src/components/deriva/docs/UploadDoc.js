'use strict';

import React from 'react';
import Parse from 'parse';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import dataSources from 'sources/index.js';

require('styles/deriva/docs/Upload.scss');

let UploadComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, doc: false, message: false}
  },

  preview_embed(ev) {
    let url = this.refs.url.value;
    console.log(url);
    // oembed(url, (err, data) => {
    //   console.log(err, data);
    // });
  },

  uploadDoc(ev) {
    // cancel form submission
    ev.preventDefault();

    let doc_props = {title: this.refs.title.value,
                     url: this.refs.url.value,
                     oembed: false }

    let doc = new dataSources.Documentary();
    _.forEach(doc_props, (v,k) => {
      console.log(k," = ", v);
      doc.set( k , v );
    });

    doc.save( null, {
      success: ( doc ) => {
        this.setState({success: true, failed: false,
                       message: `Created ${ doc.id }`});
        // dispatch('signedup', this.state )
        console.log("UploadDoc successfully!")
      },
      error: (e) => {
        this.setState({success: false, failed: true,
                        message: (e.message || "Permission DENIED. Youre not allowed.")});
        console.error("UploadDoc", e.code, e.message);
      }
    });
  },



  render() {
    let signup_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("upload-component", signup_classes)}>
            <form onSubmit={this.uploadDoc}>
              <div className="url">
                <input type="text" ref="url" id="URL" placeholder="URL"/>
                <input type="button" ref="preview" value="Preview" onClick={this.preview_embed} />
              </div>
              <div>
                <label for="title">Title</label>
                <input type="text" ref="title" id="title" placeholder="Título"/>
              </div>
              <div>
                <label for="author">Author</label>
                <input type="text" ref="author" id="author" placeholder="Autor"/>
              </div>
              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) :
                  (<p></p>) }
              </div>
              <div className="submit">
                <input type="submit" ref="submit" value="Enviar" />
              </div>
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
