
import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import actions from 'actions'
import utils from 'utils/index.js';
import models from 'models';

import ItemBox from 'components/ui/item-box.jsx';
import ModelForm from 'components/ui/model-form';

require('styles/deriva/dashboard/collection/channels/edit.scss');
let EditComponent = React.createClass({
  /*
   * A smart edit component, edit Channel Models
   */
  getInitialState() {
    let channel_id = ( this.props.params.channel_id || false);

    let empty_channel = new models.Channel();
    return { submit: {status: 0, message: false} ,
             channel: empty_channel, channel_id: channel_id };
  },

  componentWillReceiveProps( nextProps ) {
    let channel_id = (nextProps.params.channel_id || false);
    this.getChannel( channel_id );
  },
  

  createChannel(ev) {
    // cancel form submission
    ev.preventDefault();

    let form_data = this.refs.model_form.value();
    let new_channel = new models.Channel( form_data );;

    this.props.dispatch( actions.channels.insert( new_channel ) ).then( (channel_json) => {
      this.setState({channel: new models.Channel(channel_json), 
                     channel_id: channel_json.id,
                     submit: {status: 1, message: `Saved '${channel_json.id} !`}});
    }).catch( (err) => {
      this.setState({submit: err})
    });
  },

  getChannel( channel_id ){
    this.props.dispatch( actions.channels.find( channel_id) ).then( (channel) => {
      this.setState({channel_id, channel});
    });
  },
  
  componentWillMount(){
    this.getChannel( this.state.channel_id );
  },

  render() {
    let is_edit = (this.state.channel_id !== false);
    let success = (this.state.submit.status);
    let { channel } = this.state;
    return (
      <ItemBox className={classNames("box edit-component", (is_edit ? 'edit' : 'new'))}
               title={(is_edit ? `Edit #${channel.id}` : "Create new Channel")}
               return_to="/dashboard/collection/channels/" >
        <section className="item-content">
            
            <ModelForm ref="model_form" model={models.Channel} data={channel} >
              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) : false }
              </div>
            </ModelForm>
             
        </section>
        <section className="item-actions">
          <button className="btn btn-primary btn-large" onClick={this.createChannel}>Submit ✨</button>
        </section>
      </ItemBox>
    );
  }
});

EditComponent.displayName = 'Deriva.dashboard.collection.channels.EditComponent';

// redux
import { connect } from 'react-redux'

EditComponent = connect( (state) => {
  return {}
})(EditComponent);

export default EditComponent;
module.exports = EditComponent;
