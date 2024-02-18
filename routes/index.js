const routes = require('express').Router();

routes
  .use('/owners', require('./ownerRoutes'))
  .use('/pets', require('./petRoutes'))
  .use('/swagger', require('./swagger'));

module.exports = routes;
