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
    return { docId , doc: {} , error: false, loaded: false}
  },

  componentDidMount() {
    this.props.actions.get_doc( this.state.docId ).then( (new_doc) => {
      this.setState({doc: new_doc, loaded: true})
    }).catch( (error) => {
      console.error(error);
      this.setState({error: true})
    });
  },

  render() {
    let NotFound = (<div>
      <h1>404 - Documentary {this.state.docId} not found...</h1>
      <p>Ops, bad bad computer...</p>
    </div>);

    let Loading = (<div>
      loading... {this.state.docId}
    </div>);

    let WatchComponent = () => {
      return (<div>
          <Player doc={this.state.doc}  />

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
              <div>{this.state.doc.title}</div>
              <div>{this.state.doc.url}</div>
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

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

WatchComponent = connect( (state) => {
  return {}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(WatchComponent);



export default WatchComponent;
module.exports = WatchComponent;
