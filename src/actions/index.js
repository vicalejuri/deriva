import * as userActions from './user.js'
import * as derivaActions from './deriva.js'
import * as pouchActions from './pouchdb.js'
import * as docsActions from './docs.js'

import _ from 'lodash';

const actions = _.extend({},
  userActions, derivaActions, docsActions, pouchActions
);

export default actions;
