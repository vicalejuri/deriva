
let usersRoute = {
  path: 'users',
  childRoutes: [
    require('./signup'),
    require('./login')
  ]
}

export default usersRoute;
module.exports = usersRoute;
