const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

// Create an owner
router.post('/createowner', ownerController.createOwner);

// Get a list of all owners
router.get('/getowners', ownerController.getAllOwners);

// Get a single owner by id
router.get('/getowner/:id', ownerController.getSingleOwner);

// Update a single owner by id
router.put('/updateowner/:id', ownerController.updateOwner);

// Delete an owner
router.delete('/deleteowner/:id', ownerController.deleteOwner);

module.exports = router;