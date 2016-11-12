'use strict';
import React from 'react';
import utils from 'utils';
import classNames from 'classnames';

import _ from 'lodash';
import {browserHistory} from 'react-router';

require('styles/ui/ItemBox.scss');

let ItemBoxComponent = React.createClass({
  /*
   * A modal component with a header and
   *  main content. Useful for dialog box.
   */
  propTypes: {
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    return_to: React.PropTypes.string.isRequired
  },
  
  getDefaultProps() {
    return {title: '', className: '', return_to: browserHistory.goBack}
  },
  
  close(ev){
    if(_.isFunction(this.props.return_to)){
      this.props.return_to();
    } else if(_.isString(this.props.return_to)){
      browserHistory.replace(this.props.return_to);
    }
  },

  render() {
    return (<section className={classNames('item-box', this.props.className)} >
              <header className="item-header">
                <h1>{this.props.title}</h1>
                <button className="btn btn-large btn-close" onClick={this.close}>
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
