const routes = require('express').Router();

routes
  .use('/owners', require('./ownerRoutes'))
  .use('/pets', require('./petRoutes'))
  .use('/swagger', require('./swagger'))
  .use('/', require('./dashboard'));

module.exports = routes;
