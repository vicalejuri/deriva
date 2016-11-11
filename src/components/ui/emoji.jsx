'use strict';

import React from 'react';
import classNames from 'classnames';

import twemoji from 'twemoji';
require('styles/ui/emoji.scss');

/*
 * A Emoji renderer.
 * Substitute default emojis by their Twitter IMG equivalents
 */
let Emoji = React.createClass({
  emoji(){
    return {__html: twemoji.parse(this.props.children)};
  },

  render() {
    return (<span dangerouslySetInnerHTML={this.emoji()} ></span>);
  }
});


export default Emoji;
