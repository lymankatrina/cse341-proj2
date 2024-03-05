const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { requiresAuth } = require('express-openid-connect');
const { ownerValidationRules, validate } = require('../middleware/validator.js');

// Create an owner
router.post(
  '/createowner',
  requiresAuth(),
  ownerValidationRules('POST'),
  validate,
  ownerController.createOwner
);

// Get a list of all owners
router.get('/getowners', requiresAuth(), ownerController.getAllOwners);

// Get a single owner by owner id
router.get('/getowner/:id', requiresAuth(), ownerController.getSingleOwner);

// Get a single owner by pet id
router.get('/getownerbypet/:petId', requiresAuth(), ownerController.getOwnerByPet);

// Update a single owner by id
router.put(
  '/updateowner/:id',
  requiresAuth(),
  ownerValidationRules('PUT'),
  validate,
  ownerController.updateOwner
);

// Update an owners pets by owner id
router.put('/updateOwnerPetIds/:id', requiresAuth(), ownerController.updateOwnerPetIds);

// Delete an owner
router.delete('/deleteowner/:id', requiresAuth(), ownerController.deleteOwner);

module.exports = router;
