
let signupRoute = {
  path: 'signup',
  // component: require('components/deriva/user/signup')

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/user/signup'))
    })
  }
}

module.exports = signupRoute;
