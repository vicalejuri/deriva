import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

import actions from 'actions'
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
    this.props.dispatch( actions.channels.list_all_channels() );
  },

  remove( ){
    let checked_rows = (this.props.channels.filter( (channel, i) => {
      let dom_el = this.refs[`channel[${i}]`];
      return (dom_el.state.checked == true);
    }));
    checked_rows.forEach( (channel,i) => {
      console.log(channel);
      this.props.dispatch( actions.channel.delete_channel( channel ) );
    })
  },

  render() {
    return (<div className="list-page channels">

              <section className="actions">
                <div className="btn-group">

                  <button className="btn btn-default" onClick={this.remove}>
                    <span className="icon icon-trash"></span>
                    Delete
                  </button>

                  <Link to="/dashboard/collection/channels/upload" className="btn btn-default">
                    <span className="icon icon-plus-circled"> </span>
                     Add new
                  </Link>
                </div>

                <div className="btn-group">

                  <Link to="/dashboard/collection/channels/import" className="btn btn-default btn-warning" onClick={this.toggle_toolsImport}>
                    <span className="icon icon-facebook"></span>
                    Import json
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
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

ListChannelsComponent = connect( (state) => {
  return {channels: state.data.channels}
})(ListChannelsComponent);


export default ListChannelsComponent;
module.exports = ListChannelsComponent
