
let homeRoute = {

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/home.jsx'))
    },'components:deriva:home')
  }

}

module.exports = homeRoute;
