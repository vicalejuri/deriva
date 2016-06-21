
let collectionRoute = {
  path: 'collection',
  //component: require('components/deriva/dashboard/dashboard')

  //
  // getComponent( nextState, cb) {
  //   require.ensure([], (require) => {
  //     //let dashboard = require('components/deriva/dashboard/dashboard');
  //     //cb(null, dashboard  )
  //   },'collection')
  // },

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./docs.js')
      ])
    },'collection')
  }
}

export default collectionRoute;
module.exports = collectionRoute;
