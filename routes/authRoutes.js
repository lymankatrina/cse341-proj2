const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');

// req.isAuthenticated is provided from the auth router
routes.get(
  '/',
  authController.checkAuthStatus // '#swagger.ignore = true'
);

module.exports = routes;
