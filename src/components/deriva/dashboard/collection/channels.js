import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

/*
 * Table listing every document
 */
let ListChannelsComponent = React.createClass({
  componentDidMount( ) {
    this.props.actions.list_all_channels();
  },

  check( doc_id, doc ){
    //ReactDOM.findDOMNode()
    //console.log("check all", $$);
  },

  remove( ){
    let checked_rows = (this.props.docs.filter( (doc, i) => {
      let dom_el = this.refs[`doc[${i}]`];
      return (dom_el.state.checked == true);
    }));
    checked_rows.forEach( (doc,i) => {
      console.log(doc);
      this.props.actions.delete_doc( doc );
    })
  },

  render() {
    return (<div className="list-page docs">
              <section className="header">
                <h1> All Channels </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.channels.length}</strong></div>

                <div className="btn-group">
                  <button className="btn btn-default" onClick={this.remove}>
                    <span className="icon icon-trash"></span>
                  </button>

                  <Link to="/docs/upload" className="btn btn-default">
                    <span className="icon icon-plus-circled"></span>
                  </Link>
                </div>

              </section>
              <table className="list-component table-striped" ref="table">
              <thead><tr>
                  <th><input type="checkbox" onClick={this.checkAll}/> </th>
                  <th>id</th>
                  <th>title</th>
                  <th>url</th>
              </tr></thead>
              <tbody>
                {this.props.channels.map( (channel, i) =>
                  <tr>
                    <td><h2>{channel._id}</h2></td>
                    <td><p>{channel.data.title} - {channel.data.subtitle}</p></td>
                  </tr>
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
