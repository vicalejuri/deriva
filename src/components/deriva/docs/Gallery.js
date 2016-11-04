import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

let Isotope = require('isotope-layout')
let defaultBg = require('assets/components/docs/defaultDocThumb.png')

require('styles/deriva/docs/gallery.scss');

/*
 * Media gallery
 */
let GalleryComponent = React.createClass({
  getInitialState() {
    return {isotope: false}
  },

  componentDidMount( ) {
    this.props.actions.list_all_doc().then( (docs) => {
      console.log('list_all_doc', docs, docs.length);
    });
  },


  componentDidUpdate() {
    if(!this.state.isotope){

      // create isotope layot
      this.setState({isotope:  new Isotope( this.refs.gallery, {
        itemSelector: '.item',
        layoutMode: 'masonry',
        percentPosition: true
      }) });

    } else {

      // Reload items plz
      console.log("gallery: isotope.reloadItems", this.props.docs.length);
      this.state.isotope.reloadItems();
    }
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
    let idx = 0;
    let itemStyle = (doc) => {
      let bgImage = (doc.oembed && doc.oembed.thumbnail_url || defaultBg );
      return {
        backgroundImage: `url(${bgImage})`
      }
    }

    return (<div className="gallery-page docs">
              <section className="header">
                <h1> All Docs </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.docs.length}</strong></div>

              </section>
              <div className="gallery" ref="gallery">
                {this.props.docs.map( (doc, i) =>
                  <Link
                      ref={`item[${i}]`} key={doc.id}
                      to={`/docs/watch/${doc.id}`} onClick={this.itemClick}
                      className={classNames('item','clickable')} style={itemStyle(doc)}>
                    <span className="label passtrough">
                      <span className="helper"></span>
                      <span className="info">
                        <h2 className="title">{doc.title}</h2>
                        <hr className="separator"></hr>
                        {(doc.provider_name)
                          ? <p>{doc.provider_name}</p>
                          : <p>-</p>}
                      </span>
                    </span>
                  </Link>
                )}
              </div>
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
  return {docs: state.data.docs}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(GalleryComponent);


export default GalleryComponent;
module.exports = GalleryComponent
