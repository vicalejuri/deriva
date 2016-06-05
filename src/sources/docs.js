/*
 * DataSources from parse-server
 */

import Parse from 'parse';

export let User = Parse.Object.extend('User');
export let Documentary = Parse.Object.extend('Documentary');
export let Channels = Parse.Object.extend('Channel');

export default Documentary;
