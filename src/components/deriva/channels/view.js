import _ from 'lodash';
import React from 'react';

require('styles/deriva/channels/View.scss');

let ViewChannel = React.createClass({
  propTypes: {
    channelId: React.PropTypes.string
  },

  getInitialState() {

  },

  componentDidMount() {
  },

  render() {

    let viewComponent = () => {
      return (<div className="channel-view">
                <h3> {this.props.channel.name} </h3>
                <table className="list-component">
                <thead><tr>
                    <th>id</th>
                    <th>title</th>
                    <th>url</th>
                </tr></thead>
                <tbody>
                  {this.props.docs.map( (doc, i) =>
                    <tr key={i}>
                      <td><Link to={`/docs/watch/${doc._id}`} >{doc._id}</Link></td>
                      <td>{doc.data.title}</td>
                      <td>{doc.data.url}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>);
    };

    return (<div className="watch-component">
            {(this.state.error ? NotFound :
              (this.state.loaded ? WatchComponent() : Loading ))}
            </div>
    );
  }
});

ViewChannel.displayName = 'Deriva.ViewChannel';

ViewChannel = connect( (state) => {
  return {channel: state.channel }
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(ViewChannel);

export default ViewChannel;
module.exports = ViewChannel;
