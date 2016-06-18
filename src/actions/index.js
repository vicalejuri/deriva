import * as userActions from './user.js'
import * as derivaActions from './deriva.js'
import * as pouchActions from './pouchdb.js';

import _ from 'lodash';

const actions = _.extend({},
  userActions, derivaActions, pouchActions
);

console.log(actions);
export default actions;
