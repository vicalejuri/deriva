// polyfill webpack require.ensure
if( typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { Router, match, Route, Link, browserHistory } from 'react-router';

export default {

      path: '/',
      component: require('components/Main'),

      childRoutes: [
        require('./deriva/docs/index.js'),
        require('./deriva/user/index.js'),
        require('./deriva/dashboard/index.js')
      ],

      indexRoute: require('./deriva/docs/gallery.js')
}
