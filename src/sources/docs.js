/*
 * DataSources from parse-server
 */
import PouchDB from 'pouchdb'
import utils from 'utils/index.js'
import _ from 'lodash'


// export let User = Parse.Object.extend('User');
// export let Documentary = Parse.Object.extend('Documentary');
// export let Channels = Parse.Object.extend('Channel');

export function Doc( params ) {
  this._id =   utils.uuid();
  this.type = 'deriva/doc';
  this.data = params;
}

export let Channel = {};
export default Doc;
