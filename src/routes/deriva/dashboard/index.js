
let dashboardRoute = {
  path: 'dashboard',
  //component: require('components/deriva/dashboard/dashboard')

  getComponent( nextState, cb) {
    require.ensure([], (require) => {
      let dashboard = require('components/deriva/dashboard/dashboard.jsx');
      cb(null, dashboard  )
    },'dashboard')
  },

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./collection/index.js')
      ])
    },'dashboard')
  }
}

export default dashboardRoute;
module.exports = dashboardRoute;
