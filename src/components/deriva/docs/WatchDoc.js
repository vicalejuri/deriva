import _ from 'lodash';
import React from 'react';

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
      return (<div>
          <Player doc={this.state.doc.data}  />
          <section className="info">
            <nav className="nav-group">
              <a className="nav-group-item active">
                Title
                <span className="icon icon-home"></span>
              </a>
              <span className="nav-group-item">
                URL
              </span>
              <span className="nav-group-item">
                DOC
              </span>
            </nav>
            <div className="group">
              <div>{this.state.doc.data.title}</div>
              <div>{this.state.doc.data.url}</div>
              <div><textarea readOnly value={JSON.stringify(this.state.doc.data)} /></div>
            </div>
          </section>
      </div>);
    };

    return (<div className="watch-component">
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
module.exports = WatchComponent;
