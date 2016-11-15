let editRoute = {
  path: 'edit/(:channel_id)',
  component: { main: require('components/deriva/dashboard/collection/channels/list.jsx'),
               rightbar: require('components/deriva/dashboard/collection/channels/edit.jsx')}
}

module.exports = editRoute;
