
import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'

import utils from 'utils/index.js';
import ItemBox from 'components/ui/item-box.jsx';

import actions from 'actions'

require('styles/deriva/dashboard/collection/docs/insert.scss');

let InsertDocComponent = React.createClass({
  getInitialState() {
    return { error: false, message: false,
             url: false,
             oembed: {title: '', author: '', html: ''},
             channel: []}
  },

  embed(html) {
    return {__html: html}
  },

  preview_embed(ev) {
    let url = this.refs.url.value;

    utils.oembed( url ).then( (data) => {
                          this.setState({error: false,
                                         url, oembed: data });
                        }).catch( (err) => {
                         this.setState({error: true,
                                        message: 'Sorry, the preview robot is offline.'})
                        });
  },

  uploadDoc(ev) {
    // cancel form submission
    ev.preventDefault();

    let doc_props = {title: this.refs.title.value,
                     url: this.refs.url.value,
                     description: this.state.oembed.description,
                     type: this.state.oembed.type,
                     provider_name: this.state.oembed.provider_name,
                     oembed: this.state.oembed }

    this.props.dispatch( actions.docs.insert_doc( doc_props )
                      .then( (doc) => {
                        console.log('Created', doc)
                        this.setState({error: false, message: `Created ${doc.id}`});
                      })
                      .catch( (err) => {
                        this.setState({error: true, message: `Error: ${err.error}`})
                      }) );
  },


  componentWillReceiveProps( newProps ) {
    // error/success messages
  },

  componentDidMount( ) {
    this.props.dispatch( actions.channels.list_all_channels() );
  },

  /*
   * Make 'channels' autocomplete Suggestion
   */
  autocompleteSuggestion(props) {

    const {addTag, ...other} = props;
    let { channel } = this.state;
    let input = (props.value && props.value.trim().toLowerCase())

    let suggestions = this.props.channels.filter( (channel) => {
      return channel.id.toLowerCase().slice(0, input.length) == input
    });

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.id }
        renderSuggestion={(suggestion) => <span>{suggestion.id}</span>}
        inputProps={other}
        onSuggestionSelected={(e,{suggestion}) => {
          console.log('suggestion:selected', suggestion.id);
          this.refs.channel.addTag( suggestion.id );
        }}
      />
    )
  },

  channelTagsChange(channels_list) {
    this.setState({channel: channels_list})
  },


  render() {
    let insert_classes = {success: !this.state.error, failed: this.state.error };
    return (
      <ItemBox className={classNames('insert-doc', insert_classes)} title="New Doc">
          <section className="item-content">
            <form onSubmit={this.uploadDoc}>
            { this.state.oembed ? (
              <div className="embed-preview"
                    dangerouslySetInnerHTML={this.embed(this.state.oembed.html)} />)
              : (<p>🎦</p>) }

              <div className="url form-group">
                <input type="text" className="form-control" ref="url" id="URL" placeholder="URL"/>
                <input type="button" className="form-control" ref="preview" value="Preview" onClick={this.preview_embed} />
              </div>
              <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" ref="title" id="title" placeholder="Título" value={this.state.oembed.title}/>
              </div>
              <div className="form-group">
                <label for="author">Channel</label>
                <TagsInput ref="channel" renderInput={this.autocompleteSuggestion} value={this.state.channel} onChange={this.channelTagsChange}/>
              </div>
              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) :
                  (<div/>) }
              </div>
            </form>
          </section>
          <section className="item-actions">
            <button className="btn btn-primary submit">
              Insert ✨
            </button>
          </section>
        </ItemBox>
    );
  }
});

InsertDocComponent.displayName = 'Deriva.docs.InsertDocComponent';

// redux
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
InsertDocComponent = connect( (state) => {
  return { channels: state.data.channels}
})(InsertDocComponent);

export default InsertDocComponent;
module.exports = InsertDocComponent
