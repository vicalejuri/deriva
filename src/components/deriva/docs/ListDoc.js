'use strict';

import React from 'react';
import _ from 'lodash'

import {  Link } from 'react-router';

require('styles/deriva/docs/List.scss');

let ListComponent = React.createClass({
  getInitialState() {
    return { docs: [] , error: false}
  },

  componentDidMount() {
    window.remote_db.query( 'docs/by_id', {include_docs: true})
    .then( (result) => {
      let docs = _.map(result.rows, (v,k) => {
        return v.doc;
      });
      this.setDocuments(docs);
    }).catch(function (err) {
      // handle any errors
    });
  },

  setDocuments(docs) {
    console.log(docs);
    this.setState({docs});
  },

  render() {
    return (<div className="list-page">
              <h3> All Docs </h3>
              <table className="list-component">
              <thead><tr>
                  <th>id</th>
                  <th>title</th>
                  <th>url</th>
              </tr></thead>
              <tbody>
                {this.state.docs.map( (doc, i) =>
                  <tr>
                  <td><Link to={`/watch/${doc._id}`} >{doc._id}</Link></td>
                  <td>{doc.data.title}</td>
                  <td>{doc.data.url}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    );
  }
});

ListComponent.displayName = 'Deriva.ListComponent';

// Uncomment properties you need
// WatchComponent.propTypes = {};
// WatchComponent.defaultProps = {};

export default ListComponent;
