
let dashboardRoute = {
  path: 'dashboard',

  getComponent( location, next){
    require.ensure([], (require) => {
      next(null, [
        require('components/deriva/dashboard/dashboard')
      ]);
    },'components:dashboard:index');
  },

  childRoutes: [
    require('./collection/index.js'),
  ]
}

export default dashboardRoute;
module.exports = dashboardRoute;
