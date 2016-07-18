import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

require('styles/deriva/dashboard/list.scss');

/*
 * Single row
 */
let ChannelRow = React.createClass({
  propTypes: {
    channel: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return {checked: false};
  },

  check(ev){
    let cbox = this.refs.checkbox;

    cbox.checked = !cbox.checked;
    this.setState({checked: cbox.checked});
  },

  render(){
    let channel = this.props.channel;

    return (<tr className={classNames(this.state)} onClick={this.check} ref="tr">
      <td><input type="checkbox" ref="checkbox" className="checkbox" onClick={this.check} checked={this.state.checked}/></td>
      <td><Link to={`/channel/edit/${channel._id}`} >{channel.id}</Link></td>
      <td>{channel.title} - {channel.subtitle}</td>
      <td>{channel.description}</td>
    </tr>);
  }
});

let ListChannelsComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_channel();
  },

  remove( ){
    let checked_rows = (this.props.channels.filter( (channel, i) => {
      let dom_el = this.refs[`channel[${i}]`];
      return (dom_el.state.checked == true);
    }));
    checked_rows.forEach( (channel,i) => {
      console.log(channel);
      this.props.actions.delete_channel( channel );
    })
  },

  render() {
    return (<div className="list-page channels">
              <section className="header">
                <h1> All Channels </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.channels.length}</strong></div>

                <div className="btn-group">
                  <Link to="/dashboard/collection/channels" className="btn btn-default" >
                    <span className="icon icon-list"></span>
                  </Link>

                  <button className="btn btn-default" onClick={this.remove}>
                    <span className="icon icon-trash"></span>
                  </button>

                  <Link to="/dashboard/collection/channels/upload" className="btn btn-default">
                    <span className="icon icon-plus-circled"></span>
                  </Link>
                </div>

              </section>
              <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  <th>id</th>
                  <th>title / subtitle</th>
                  <th>Description </th>
              </tr></thead>
              <tbody>
                {this.props.channels.map( (channel, i) =>
                  <ChannelRow ref={`channel[${i}]`} channel={channel} key={channel.id} />
                )}
              </tbody>
            </table>
          </div>
    );
  }
});

ListChannelsComponent.displayName = 'Deriva.ListChannelsComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ListChannelsComponent = connect( (state) => {
  return {channels: state.channels || []}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ListChannelsComponent);


export default ListChannelsComponent;
module.exports = ListChannelsComponent
