'use strict';

import React from 'react';

require('styles/deriva/player/Record.scss');

navigator.getUserMedia = (navigator.getUserMedia,
                          navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

let RecordComponent = React.createClass({
  getInitialState() {
    return {state: '', browser_supported: true, blobURL: undefined}
  },

  componentDidMount(){
    let has_usermedia = !! navigator.getUserMedia();
    if( ! has_usermedia ){
      this.setState({browser_supported: false})
    }
  },

  loadedVideo(ev){
    console.log('preview',ev);
    this.createTorrent();
    // Ready to go
  },

  errorVideo(ev){
    console.log('error-preview',ev);
  },

  createTorrent(){
    console.log(this.state.blobURL);

    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style="display: none";
    a.href = this.state.blobURL;
    a.download = 'webcam.mp4';
    a.click();
    /*
    window.trrnt.seed( this.state.blobURL,  (eita) => {
      console.log(eita);
    })
    window.trrnt.on('torrent', (trnt) =>{
      console.log('torrent ready', trnt);
    });
    */
  },

  preview(ev){
    navigator.getUserMedia({video: true},
    (lMediaStream) => {
      console.log("stream", lMediaStream);
      let video = this.refs.video;
      let blobURL = window.URL.createObjectURL(lMediaStream);
      video.src = blobURL
      video.onloadedmetadata = this.loadedVideo;
      video.play();
      this.setState({blobURL: blobURL});
    }, this.errorVideo );
  },

  record(ev){
  },

  render() {
    let Viewer = (
    <div>
      <div className="viewer">
        <video ref="video" autoplay="autoplay"></video>
      </div>
      <button className="btn btn-default" onClick={this.preview}>
      <span className="icon icon-play icon-text"></span>
        Preview
      </button>
      <button className="btn btn-default" onClick={this.record}>
        <span className="icon icon-record icon-text"></span>
        Record
      </button>
    </div>
    )

    return (<section className="record-component">
              {(! this.state.browser_supported)
                ? (<p>Browser not supported</p>)
                : Viewer }
            </section>
    );
  }
});

RecordComponent.displayName = 'Deriva.RecordComponent';

// Uncomment properties you need
// WatchComponent.defaultProps = {};

export default RecordComponent;
