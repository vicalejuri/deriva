// polyfill webpack require.ensure
if( typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { Router, match, Route, Link, browserHistory } from 'react-router';

//import AppComponent from 'components/Main';
//import NotFoundComponent from 'components/404.js';
//import WatchDoc from 'components/deriva/docs/WatchDoc.js';
//import ListDoc from 'components/deriva/docs/ListDoc.js';
//import UploadDoc from 'components/deriva/docs/UploadDoc.js';
//import SignupComponent from 'components/deriva/user/signup.js';

/*
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="/list" component={ListDoc} />
    <Route path="/upload" component={UploadDoc} />
    <Route path="/watch/:docId" component={WatchDoc} />
    <Route path="/signup" component={SignupComponent} />
    <Route path="*" component={NotFoundComponent} />
  </Route>
</Router>
*/

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
