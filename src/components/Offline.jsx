import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Emoji from 'components/ui/Emoji.js';
require('styles/deriva/Offline.scss');

export let OfflineComponent = React.createClass({

  render() {
    return (
      <div className="offline-component">
        <img src="http://i.giphy.com/gMq5BfFDVXi8M.gif" />
        <h1><Emoji>🚧 Server seems offline 🚧</Emoji></h1>
        <p>Try again in a few minutes.</p>
      </div>
    );
  }
});

export default OfflineComponent;
module.exports = OfflineComponent;
