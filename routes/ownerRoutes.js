const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { ownerValidationRules, validate } = require('../middleware/validator.js');

// Create an owner
router.post('/createowner', ownerValidationRules(), validate, ownerController.createOwner);

// Get a list of all owners
router.get('/getowners', ownerController.getAllOwners);

// Get a single owner by owner id
router.get('/getowner/:id', ownerController.getSingleOwner);

// Get a single owner by pet id
router.get('/getownerbypet/:pets', ownerController.getOwnerByPet);

// Update a single owner by id
router.put('/updateowner/:id', ownerValidationRules(), validate, ownerController.updateOwner);

// Delete an owner
router.delete('/deleteowner/:id', ownerController.deleteOwner);

module.exports = router;
