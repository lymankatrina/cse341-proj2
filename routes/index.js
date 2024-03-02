const routes = require('express').Router();

routes
  .use('/', require('./authRoutes.js'))
  .use('/', require('./dashboard'))
  .use('/', require('./swagger'))
  .use('/owners', require('./ownerRoutes'))
  .use('/pets', require('./petRoutes'))
  .use('/lookup', require('./lookupRoutes'));

module.exports = routes;
