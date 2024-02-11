const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Create a pet
router.post('/createpet', petController.createPet);

// Get a list of all pets
router.get('/getpets', petController.getAllPets);

// Get a single pet by id
router.get('/getpet/:id', petController.getSinglePet);

// Update a single pet by id
router.put('/updatepet/:id', petController.updatePet);

// Delete an pet
router.delete('/deletepet/:id', petController.deletePet);

module.exports = router;