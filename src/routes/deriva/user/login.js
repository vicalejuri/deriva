
let loginRoute = {
  path: 'login',
  // component: require('components/deriva/user/signup')

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/user/login'))
    })
  }
}

module.exports = loginRoute;
