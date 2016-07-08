import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

require('styles/deriva/docs/gallery.scss');

/*
 * Media gallery
 */
let GalleryComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },

  itemClick(ev){
    ev.preventDefault();
    let target = ev.target;

    // Go to doc url
    let uri = target.getAttribute('href');
    browserHistory.push(uri);
  },

  render() {

    // inline style for .item element
    let itemStyle = (doc) => {
      return {
        backgroundImage: `url(${doc.data.oembed.thumbnail_url})`
      }
    }

    return (<div className="gallery-page docs">
              <section className="header">
                <h1> All Docs </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.docs.length}</strong></div>

              </section>
              <ul className="gallery" ref="gallery">
                {this.props.docs.map( (doc, i) =>
                  <li
                      ref={`item[${i}]`} doc={doc} key={doc._id}
                      href={`/docs/watch/${doc._id}`} onClick={this.itemClick}
                      className="item clickable" style={itemStyle(doc)}>
                    <div className="icon icon-trash">
                      {doc.data.title}
                    </div>
                  </li>
                )}
              </ul>
          </div>
    );
  }
});

GalleryComponent.displayName = 'Deriva.GalleryComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

GalleryComponent = connect( (state) => {
  return {docs: state.docs}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(GalleryComponent);


export default GalleryComponent;
module.exports = GalleryComponent
