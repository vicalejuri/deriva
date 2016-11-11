'use strict';

import React from 'react';

require('styles/deriva/player/LivePlayer.scss');

navigator.getUserMedia = (navigator.getUserMedia,
                          navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

let LivePlayerComponent = React.createClass({
  getInitialState() {
    return {browser_supported: true, blobURL: undefined}
  },

  componentDidMount(){
    let has_usermedia = !! navigator.getUserMedia();
    if( ! has_usermedia ){
      this.setState({browser_supported: false})
    } else {

    }
  },

  loadedVideo(ev){
    console.log(ev);
    this.createTorrent();
    // Ready to go
  },

  errorVideo(ev){
    console.log(ev);
  },

  createTorrent(){
    console.log(this.state.blobURL);
    let file = this.refs.file;
    file.src = this.state.blobURL;
    console.log(this.state.blobURL);
    console.log(file);
    window.trrnt.seed( file,  (eita) => {
      console.log(eita);
    })
    window.trrnt.on('torrent', (trnt) =>{
      console.log('torrent ready', trnt);
    });
  },


  LivePlayer(ev){
    navigator.getUserMedia({video: true},
    (lMediaStream) => {
      console.log("stream", lMediaStream);
      console.log(lMediaStream);
      let video = this.refs.video;
      let blobURL = window.URL.createObjectURL(lMediaStream);
      video.src = blobURL
      video.onloadedmetadata = this.loadedVideo;
      video.play();
      this.setState({blobURL: blobURL});
    }, this.errorVideo );
  },

  render() {
    let Viewer = (
    <div>
      <div className="viewer">
        <video ref="video" autoplay="autoplay"></video>
      </div>
      <button className="btn btn-default" onClick={this.LivePlayer}>
        <span className="icon icon-LivePlayer icon-text"></span>
        LivePlayer
      </button>
    </div>
    )

    return (<section className="liveplayer-component">
              {(! this.state.browser_supported)
                ? (<p>Browser not supported</p>)
                : Viewer }
            </section>
    );
  }
});

LivePlayerComponent.displayName = 'Deriva.LivePlayerComponent';

// Uncomment properties you need
// WatchComponent.defaultProps = {};

export default LivePlayerComponent;
