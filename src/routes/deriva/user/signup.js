
let signupRoute = {
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/user/signup'))
    })
  }
}

export default signupRoute;
module.exports = signupRoute;
