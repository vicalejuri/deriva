'use strict';

import React from 'react';
import Parse from 'parse';

import {  Link } from 'react-router';

require('styles/deriva/docs/List.scss');

let ListComponent = React.createClass({
  getInitialState() {
    return { docs: [] , error: false}
  },

  componentDidMount() {
    console.log("list query");
    (new Parse.Query('Documentary')).find().then( (results) => {
      console.log(`Fetched : ${results.length} `);
      this.setDocuments( results );
    }, (e) => {
      console.error(e);
      this.setState({error: true});
    });
  },

  setDocuments(docs) {
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
                  <td><Link to={`/watch/${doc.id}`} >{doc.id}</Link></td>
                  <td>{doc.get('title')}</td>
                  <td>{doc.get('url')}</td>
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
