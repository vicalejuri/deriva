'use strict';

import React from 'react';
import classNames from 'classnames';

/*
 * A channel selection component
 */
import SelectComponent from 'components/ui/_select.js';

SelectComponent.displayName = 'Deriva.channels.ChannelsSelect';
export default SelectComponent;

// Channel select component
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

export let ChannelSelect = connect( (state) => {
  return {name: 'channel_select',
          options: state.data.channels.map( (channel) => {
            return {label: channel.title, value: channel.id}
          })
         }
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(SelectComponent);
