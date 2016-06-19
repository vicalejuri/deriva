'use strict';

import React from 'react';
import plyr from 'plyr';
import utils from 'utils';

require('styles/deriva/player/Player.scss');
require('plyr/dist/plyr.css');

let plyrsvg = require('assets/plyr.svg');

let PlayerComponent = React.createClass({
  propTypes: {
    doc: React.PropTypes.object
  },

  getInitialState() {
    return {id: false, provider: false, ready: false}
  },

  embedMarkup( link ) {
    return {__html: link}
  },

  getVideoId( link ) {
    let id = undefined;

    if( (id=/youtu.be\/(\w+)$/.exec(link)) ||
        (id=/youtube.com\/embed\/(\w+)$/.exec(link)) ||
        (id=/youtube.com\/watch\?v\=(\w+)/.exec(link)) ){
      this.setState({provider: 'youtube', id: id[1]});
    }else if ( (id=/vimeo.com\/(\w+)$/.exec(link)) ) {
      this.setState({provider: 'vimeo', id: id[1]})
    }
  },

  componentWillMount(){
    this.getVideoId( this.props.doc.url );
  },

  componentDidMount(){
    this.player = plyr.setup( this.refs.player.firstChild , {
      iconUrl: plyrsvg,
      disableContextMenu: false,
      tooltips: { controls: true, seek: true}
    });
  },

  componentWillUnmount () {
    //this.player.destroy();
  },

  render() {
    return (<section ref="player" className="player-component" >
            <div data-type={this.state.provider} data-video-id={this.state.id}></div>
            </section>
    );
  }
});

PlayerComponent.displayName = 'Deriva.PlayerComponent';

// Uncomment properties you need
// WatchComponent.defaultProps = {};

export default PlayerComponent;
