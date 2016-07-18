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
    return { docId }
  },

  componentDidMount() {
    this.props.actions.get_doc( this.state.docId );
    /*
    window.db.get(this.state.docId)
    .then( (doc) => {
      this.setDocumentary( doc )
    }).catch( (err) => {
      console.error(err);
      this.setState({error: true});
    });
    */
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
          <Player doc={this.props.watch}  />
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
              <div>{this.props.watch.title}</div>
              <div>{this.props.watch.url}</div>
              <div><textarea readOnly value={JSON.stringify(this.props.watch)} /></div>
            </div>
          </section>
      </div>);
    };

    return (<div className="watch-component">
            {(this.props.watch.error ? NotFound :
              (this.props.watch.loaded ? WatchComponent() : Loading ))}
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
  return {watch: state.watch}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(WatchComponent);



export default WatchComponent;
module.exports = WatchComponent;
