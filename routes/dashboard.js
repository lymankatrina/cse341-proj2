const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.welcomeMessage);

// router.get('/dashboard', dashboardController.authorize);

module.exports = router;
