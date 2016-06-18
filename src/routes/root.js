// polyfill webpack require.ensure
if( typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { Router, match, Route, Link, browserHistory } from 'react-router';

import AppComponent , {DefaultComponent} from 'components/Main';
//import NotFoundComponent from 'components/404.js';
//import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
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
  component: AppComponent,
  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [ require('./watch')])
    })
  },
  indexRoute: {
    component: ListDoc
  }
}
