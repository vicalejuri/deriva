import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Emoji from 'components/ui/emoji.jsx';
require('styles/deriva/Offline.scss');

/*
 * Offline screen for when PouchDB cannot be accessed
 */
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
