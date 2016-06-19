
let usersRoute = {
  path: 'users',
  childRoutes: [
    require('./signup')
  ]
}

export default usersRoute;
module.exports = usersRoute;
