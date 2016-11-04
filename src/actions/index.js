import * as userActions from './user.js'
import * as derivaActions from './deriva.js'

import * as channelActions from './channels.js'
import * as docsActions from './docs.js'
import * as pouchActions from './pouchdb.js'

import * as uiActions from './ui.js'
import * as oembedActions from './oembed.js'

import _ from 'lodash';

const actions = _.extend({},
  userActions, derivaActions,
  channelActions, docsActions,

  oembedActions, uiActions,

  pouchActions
);

export default actions;
