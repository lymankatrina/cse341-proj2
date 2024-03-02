const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get(
  '/dashboard',
  dashboardController.welcomeMessage // '#swagger.ignore = true'
);

module.exports = router;
