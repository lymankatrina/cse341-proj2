const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');

/* POST REQUESTS */
// create a pet
exports.createPet = async (req, res) => {
  try {
    const pet = {
      petName: req.body.petName,
      species: req.body.species,
      petBreed: req.body.petBreed,
      mixedBreed: req.body.mixedBreed,
      petMarkings: req.body.petMarkings,
      petSex: req.body.petSex,
      petImage: req.body.petImage,
      petOwner: req.body.petOwner
    };
    const response = await mongodb.getDb().db().collection('pets').insertOne(pet);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET REQUESTS */
// get all pets
exports.getAllPets = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('pets').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('An error occurred while retrieving all pets:', error);
    res.status(500).json({ error: 'An error occurred while retrieving all pets' });
  }
};

// get a single pet
exports.getSinglePet = async (req, res) => {
  try {
    const petId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('pets').find({ _id: petId }).toArray();
    if(result.length >0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    console.error('An error occurred while retrieving a single pet:', error);
    res.status(500).json({ error: 'An error occurred while retrieving a single pet' });
  }
};

/* PUT REQUESTS */
 // update one pet
 exports.updatePet = async (req, res) => {
  try{ 
    const petId = new ObjectId(req.params.id);
    const pet = {
      petName: req.body.petName,
      species: req.body.species,
      petBreed: req.body.petBreed,
      mixedBreed: req.body.mixedBreed,
      petMarkings: req.body.petMarkings,
      petSex: req.body.petSex,
      petImage: req.body.petImage,
      petOwner: req.body.petOwner
    };
    const response = await mongodb.getDb().db().collection('pets').replaceOne({ _id: petId }, pet);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    } else {
      res.status(400).json({ error: 'Pet not found' });
    }
  } catch (error) {
    console.error('An error occurred during the update pet request:', error);
    res.status(500).json({error: 'An error occurred during the update pet request.'});
  }
};

/* DELETE REQUESTS */
 // Delete a pet
 exports.deletePet = async (req, res) => {
  const petId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('pets').deleteOne({ _id: petId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occured while attempting to delete the pet.');
  }
 };
