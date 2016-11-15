
let collectionRoute = {
  path: 'collection',
  childRoutes: [
        require('./docs/index.js'),
        require('./channels/index.js'),
        require('./users/index.js')
  ]
}

export default collectionRoute;
module.exports = collectionRoute;
