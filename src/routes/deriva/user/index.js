
let usersRoute = {
  path: 'users',
  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./signup')
      ])
    },'users')
  }
}

export default usersRoute;
module.exports = usersRoute;
