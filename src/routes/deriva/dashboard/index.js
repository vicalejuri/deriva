
let dashboardRoute = {
  path: 'dashboard',
  component: require('components/deriva/dashboard/dashboard.jsx'),

  childRoutes: [
    require('./collection/index.js'),
  ]
}

export default dashboardRoute;
module.exports = dashboardRoute;
