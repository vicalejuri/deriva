import * as user from './user.js'
import * as deriva from './deriva.js'

import * as channels from './channels.js'
import * as docs from './docs.js'
import * as pouch from './pouchdb.js'

import * as ui from './ui.js'
import * as oembed from './oembed.js'

import _ from 'lodash';

let actions = {
  user, deriva,
  channels, docs,

  oembed, ui,

  pouch
};

export default actions;
