const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { petValidationRules, validate } = require('../middleware/validator.js');

// Create a pet
router.post('/createpet', petValidationRules(), validate, petController.createPet);

// Get a list of all pets
router.get('/getpets', petController.getAllPets);

// Get a single pet by pet id
router.get('/getpet/:id', petController.getSinglePet);

// Get pets by owner id
router.get('/getpetsbyowner/:petOwnerId', petController.getPetsByOwner);

// Get pets by species
router.get('/getpetsbyspecies/:species', petController.getPetsBySpecies);

// Update a single pet by id
router.put('/updatepet/:id', petValidationRules(), validate, petController.updatePet);

// Update pet owner by id
router.put('/updatepetowner/:id', petController.updatePetOwnerId);

// Delete an pet
router.delete('/deletepet/:id', petController.deletePet);

module.exports = router;
