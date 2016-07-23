// polyfill webpack require.ensure
if( typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { Router, match, Route, Link, browserHistory } from 'react-router';

/*
 * /
 *    React:  components/Main
 *
 * /docs/<gallery|upload|watch>/:id
      ReacT: components/deriva/docs/<gallery|upload|watch>
 *
 * /dashboard/index
 * /dashboard/profile
 * /dashboard/collection/<docs|channels>/(insert|list)
 *    React: components/deriva/dashboard/collection/<docs|channels>/
 *
 */
export default {

      path: '/',
      component: require('components/Main'),

      childRoutes: [
        require('./deriva/docs/index.js'),
        require('./deriva/user/index.js'),
        require('./deriva/dashboard/index.js')
      ],

      indexRoute: require('./deriva/home.js')
}
