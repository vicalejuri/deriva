'use strict';

import _ from 'lodash';
import React from 'react';
// import Parse from 'parse';

import Player from '../player/Player';

require('styles/deriva/docs/Watch.scss');

let WatchComponent = React.createClass({
  propTypes: {
    docId: React.PropTypes.string
  },

  getInitialState() {
    let docId =  (this.props.docId || this.props.params.docId || 0);
    return { docId , doc: {}, error: false, loaded: false}
  },

  componentDidMount() {
    window.remote_db.get(this.state.docId)
    .then( (doc) => {
      this.setDocumentary( doc )
    }).catch( (err) => {
      console.error(err);
      this.setState({error: true});
    });
  },

  setDocumentary(doc) {
    this.setState( {doc: doc, loaded: true}  );
  },

  render() {
    let NotFound = (<div>
      <h1>404 - Documentary {this.state.docId} not found...</h1>
      <p>Ops,bad bad computer...</p>
    </div>);

    let Loading = (<div>
      loading... {this.state.docId}
    </div>);

    let WatchComponent = () => {
      console.log(this.state);
      return (<div>
          <header>
            <h1>{this.state.docId} - {this.state.doc.data.title}</h1>
          </header>
          <Player url={this.state.doc.data.url}
                  html={this.state.doc.data.oembed.html} />

      </div>);
    };

    console.log(this.state)
    return (<div className="watch-component box">
            {(this.state.error ? NotFound :
              (this.state.loaded ? WatchComponent() : Loading ))}
            </div>
    );
  }
});

WatchComponent.displayName = 'Deriva.WatchComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default WatchComponent;
