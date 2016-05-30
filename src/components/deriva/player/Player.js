'use strict';

import React from 'react';

require('styles/deriva/player/Player.scss');

let PlayerComponent = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    html: React.PropTypes.string
  },

  embedMarkup( link ) {
    return {__html: link}
  },

  render() {
    return (<section className="player-component"
              dangerouslySetInnerHTML={this.embedMarkup(this.props.html)} >
            </section>
    );
  }
});

PlayerComponent.displayName = 'Deriva.PlayerComponent';

// Uncomment properties you need
// WatchComponent.defaultProps = {};

export default PlayerComponent;
