'use strict';

import React from 'react';
import utils from 'utils';
import classNames from 'classnames';

require('styles/ui/ItemBox.scss');

let ItemBoxComponent = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  componentWillMount(){
    console.log( 'rendering video: ' );
  },

  render() {
    return (<section className={classNames('item-box', this.props.className)} >
              <header className="item-header">
                <h1>{this.props.title}</h1>
                <button className="btn btn-large btn-close">
                  X
                </button>
              </header>
              {this.props.children}
            </section>
    );
  }
});

ItemBoxComponent.displayName = 'Deriva.ui.ItemBoxComponent';

export default ItemBoxComponent;
