'use strict';

import _ from 'lodash';
import React from 'react';
import Parse from 'parse';

import Player from '../player/Player';

require('styles/deriva/docs/Watch.scss');

let WatchComponent = React.createClass({
  propTypes: {
    docId: React.PropTypes.string
  },

  getInitialState() {
    let docId =  (this.props.docId || this.props.params.docId || 0);
    return { docId , documentary: {}}
  },

  getDefaultProps() {
    return {
      error: false,
      loaded: false
    };
  },

  componentDidMount() {
    (new Parse.Query('Documentary')).get(this.state.docId).then( (doc) => {
      console.log(`Fetched doc: ${doc.id} `,  doc.attributes );
      let newProps = _.extend( {documentary: doc.attributes }, {loaded: true});
      this.setDocumentary( newProps );
    }, (e) => {
      console.error(e);
      this.setState({error: true});
    });
  },

  setDocumentary(doc) {
    this.setState(doc);
    this.setProps({loaded: true});
  },

  render() {
    let NotFound = (<div>
      <h1>404 - Documentary {this.state.docId} not found...</h1>
      <p>Ops,this is a broken link... are you sure you copied the URL right?</p>
    </div>);

    let Loading = (<div>
      loading... {this.state.docId}
    </div>);

    let WatchComponent = (
      <div>
          <header>
            <h1>{this.state.docId} - {this.state.documentary.title}</h1>
          </header>
          <Player url={this.state.documentary.url}
                  html={this.state.documentary.html} />
          <section className="comments">
            Comments:
          </section>
      </div>
    );

    return (<div className="watch-component">
            {(this.state.error ? NotFound :
              (this.state.loaded ? WatchComponent : Loading ))}
            </div>
    );
  }
});

WatchComponent.displayName = 'Deriva.WatchComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default WatchComponent;
