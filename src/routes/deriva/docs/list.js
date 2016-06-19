
let listRoute = {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/ListDoc'))
    })
  }
}

export default listRoute;
module.exports = listRoute;
