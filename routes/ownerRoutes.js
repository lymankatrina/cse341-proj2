const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { ownerValidationRules, validate } = require('../middleware/validator.js');

// Create an owner
router.post('/createowner', ownerValidationRules(), validate, ownerController.createOwner);

// Get a list of all owners
router.get('/getowners', ownerController.getAllOwners);

// Get a single owner by owner id
router.get('/getowner/:ownerid', ownerController.getSingleOwner);

// // Get a single owner by pet id
// router.get('/getownerbypet/:petid', ownerController.getOwnerByPet);

// Update a single owner by id
router.put('/updateowner/:ownerid', ownerValidationRules(), validate, ownerController.updateOwner);

// Delete an owner
router.delete('/deleteowner/:ownerid', ownerController.deleteOwner);

module.exports = router;
