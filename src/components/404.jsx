import {  Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

require('styles/deriva/404.scss');

export let NotFoundComponent = React.createClass({

  render() {
    return (
      <div className="notfound-component">
        <h1>404</h1><h3>Bro ain't here</h3>
      </div>
    );
  }
});

export default NotFoundComponent;
module.exports = NotFoundComponent;
