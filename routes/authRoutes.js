const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const { requiresAuth } = requires('express-openid-connect');

// req.isAuthenticated is provided from the auth router
routes.get(
  '/',
  authController.checkAuthStatus // '#swagger.ignore = true'
);

routes.get('/profile', requiresAuth(), authController.checkProfile // '#swagger.ignore = true'
);

module.exports = routes;

