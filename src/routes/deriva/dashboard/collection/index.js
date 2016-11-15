
let collectionRoute = {
  path: 'collection',
  childRoutes: [
        require('./docs'),
        require('./channels'),
        require('./users')
  ]
}

export default collectionRoute;
module.exports = collectionRoute;
