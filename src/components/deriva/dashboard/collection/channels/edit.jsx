
import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import actions from 'actions'
import utils from 'utils/index.js';
import models from 'models';

import ItemBox from 'components/ui/item-box.jsx';
import ModelForm from 'components/ui/model-form.jsx';

require('styles/deriva/dashboard/collection/channels/edit.scss');
let EditComponent = React.createClass({
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

    let new_channel = new models.Channel({
                     title: this.refs.title.value,
                     subtitle: this.refs.subtitle.value,
                     description: this.refs.description.value,
                     category: this.refs.category.value,
                     tags: this.refs.tags.value,
                     order: this.refs.order.value,
                     docs: []
                    });

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
          
          {/*
            <form className="channel-edit-form">
              <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" ref="title" value={channel.title} id="title" placeholder="Título" />
              </div>
              <div className="form-group">
                <label for="title">subtitle</label>
                <input type="text" className="form-control" ref="subtitle" value={channel.subtitle} id="subtitle" placeholder="SubTítulo"/>
              </div>
              <div className="form-group">
                <label for="title">Category</label>
                <Select ref="category" className="form-control" options={models.Channel._options.category} value={channel.category}/>
              </div>
              <div className="form-group">
                <label for="title">Description</label>
                <textarea rows="4" cols="4" className="form-control" ref="description" value={channel.description} id="description" placeholder="Descrição" >
                </textarea>
              </div>

              <div className="form-group">
                <label for="tags">Tags</label>
                <input type="text" className="form-control" ref="tags" value={channel.tags} id="tags" placeholder="Tags"/>
              </div>
              <div className="form-group">
                <label for="author">order</label>
                <input type="range" min="0" max="100" step="1" defaultValue="0" className="form-control" ref="order" value={channel.order} />
              </div>
            </form>
              
          */}
            
            <ModelForm model={models.Channel} data={channel} >
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
