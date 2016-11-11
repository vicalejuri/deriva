'use strict';

import React from 'react';
import classNames from 'classnames';

require('styles/deriva/player/Torrent.scss');

let TorrentComponent = React.createClass({
  propTypes: {
    magnet: React.PropTypes.string,
    filename: React.PropTypes.string,
    timeout: React.PropTypes.number
  },

  getDefaultProps() {
    return {timeout: 5000,
            filename: 'seila',
            magnet: "magnet:?xt=urn:btih:e717397dcee33ddd43b69a4f7b2f4392ba5dc8c6&dn=Funki+Porcini+-+'The+Big+Sea'-b_Aavyv9pEY.mp4&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io"
            //magnet: "magnet:?xt=urn:btih:9f174b5abd680bbb8fcce113c54c150e802693d4&dn=Funki+Porcini+-+'The+Great+Drive+By'-AZX02E0lugo.mkv&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io"
            //magnet: 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4'
          };
  },

  getInitialState() {
    return {state: 'loading', msg: 'loading', submsg: ''};
  },

  openTab(e) {
    let link = e.target;

    this.state.file.getBlobURL(function (err, url) {
      if (err) throw err
      var a = document.createElement('a')
      link.download = this.state.filename;
      link.href = url
    });

    e.preventDefault();
  },

  render() {
    window.trrnt.add( this.props.magnet, (torrent) => {
      console.log('trrnt:loaded ok');
      let file = torrent.files[0];
      this.setState({torrent, file, state: 'loaded', msg: ''});
      file.appendTo( this.refs.placeholder );
    });
    setTimeout( () => {
      if(this.state.state === 'loading'){
        this.setState({state: 'timeout', msg: 'timeout'});
      }
    }, this.props.timeout );

    return (<section ref="placeholder" className={classNames('torrent-component', this.state.state)} >
              <label className="magnet"><a onClick={this.openTab} href="{this.props.magnet}"> {this.props.magnet}</a></label>
              <label className="file">{this.props.filename}</label>
              <label className="message"><h3>{this.state.msg}</h3></label>
              <label className="submessage"><p>{this.state.submsg}</p></label>
            </section>
    );
  }
});

TorrentComponent.displayName = 'Deriva.player.TorrentComponent';

// Uncomment properties you need
// WatchComponent.defaultProps = {};

export default TorrentComponent;
