'use strict';

import React from 'react';
import classNames from 'classnames';

/*
 * A nice select
 */
let SelectComponent = React.createClass({
  propTypes: {
    options: React.PropTypes.array,
    value: React.PropTypes.string
  },

  getInitialState(){
    return {selected: ''}
  },

  render() {
    return (<select ref={this.props.ref} className={classNames('select-component', this.props.className)} >
            {this.props.options.map( (opt, i) =>
              <option label={opt.label} value={opt.value}>{opt.label}</option>
            )}
            </select>
    );
  }
});

SelectComponent.displayName = 'Deriva.channels.SelectComponent';
export default SelectComponent;

// Channel select component
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

export let ChannelSelect = connect( (state) => {
  return {options: state.channels.map( (channel) => {
    return {label: channel.title, value: channel.id}
  })}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(SelectComponent);
