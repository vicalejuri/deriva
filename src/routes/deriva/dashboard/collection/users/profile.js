
let profileRoute = {
  path: 'profile/:userName',
  component: { main: require('components/deriva/dashboard/collection/users/list.jsx'),
               rightbar: require('components/deriva/dashboard/collection/users/profile.jsx')}
}

module.exports = profileRoute;
