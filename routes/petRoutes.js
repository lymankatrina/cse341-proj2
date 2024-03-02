const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { requiresAuth } = require('express-openid-connect');
const { petValidationRules, validate } = require('../middleware/validator.js');

// Create a pet
router.post('/createpet', requiresAuth(), petValidationRules(), validate, petController.createPet);

// Get a list of pets without identifiers
router.get('/getpetsgeneric', petController.getPetsGeneric);
// Get a list of all pets
router.get('/getpets', requiresAuth(), petController.getAllPets);

// Get a single pet by pet id
router.get('/getpet/:id', requiresAuth(), petController.getSinglePet);

// Get pets by owner id
router.get('/getpetsbyowner/:petOwnerId', requiresAuth(), petController.getPetsByOwner);

// Get pets by species
router.get('/getpetsbyspecies/:species', requiresAuth(), petController.getPetsBySpecies);

// Update a single pet by id
router.put(
  '/updatepet/:id',
  requiresAuth(),
  petValidationRules(),
  validate,
  petController.updatePet
);

// Update pet owner by id
router.put('/updatepetowner/:id', requiresAuth(), petController.updatePetOwnerId);

// Delete a pet
router.delete('/deletepet/:id', requiresAuth(), petController.deletePet);

module.exports = router;
