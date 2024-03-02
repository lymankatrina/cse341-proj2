const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* GET REQUESTS */
// get all pets
exports.getAllPets = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get all Pets'
  // #swagger.description = 'This will list all pets in the database'
  const result = await mongodb.getDb().db().collection('pets').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// get a single pet
exports.getSinglePet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get a single pet by ID'
  // #swagger.description = 'This will return a single pet in the database by pet Id'
  const petId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('pets').find({ _id: petId });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  });
};

// get all pets by single owner Id
exports.getPetsByOwner = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get pets by owner Id'
  // #swagger.description = 'This will return a list of all pets associated with a single owner in the database by petOwner Id'
  const petOwnerId = req.params.petOwnerId;
  const result = await mongodb.getDb().db().collection('pets').find({ petOwner: petOwnerId });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res.status(404).json({ error: 'No pets found by that owner Id' });
    }
  });
};

// get all pets by species
exports.getPetsBySpecies = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get all pets by species'
  // #swagger.description = 'This will return a list of all pets by species'
  const petSpecies = req.params.species;
  const result = await mongodb.getDb().db().collection('pets').find({ species: petSpecies });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res
        .status(404)
        .json({ error: 'No pets found by that species. Available species are DOG or CAT' });
    }
  });
};

/* POST REQUESTS */
// create a pet
exports.createPet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Create a Pet'
  // #swagger.description = 'Create a Pet by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          petName: 'Oliver',
          species: 'DOG',
          petBreed: [
            'Labrador',
            'Poodle'
          ],
          mixedBreed: true,
          petMarkings: 'yellow',
          petSex: 'MALE',
          petImage: 'https://images.dog.ceo/breeds/terrier-dandie/n02096437_4184.jpg',
          petOwner: '65c6f5ecd51fdd04775b0a48'
        }
      }
    }
  }
  */
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
  } else {
    res.status(404).json({ error: 'Pet could not be created' });
  }
};

/* PUT REQUESTS */
// update one pet
exports.updatePet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Update a Pet'
  // #swagger.description = 'Update a Pet by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          petName: 'Oliver',
          species: 'DOG',
          petBreed: [
            'Labrador',
            'Poodle'
          ],
          mixedBreed: true,
          petMarkings: 'yellow',
          petSex: 'MALE',
          petImage: 'https://images.dog.ceo/breeds/terrier-dandie/n02096437_4184.jpg',
          petOwner: '65c6f5ecd51fdd04775b0a48'
        }
      }
    }
  }
  */
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
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'Pet not found' });
  } else {
    res.status(500).json({ error: 'An error occurred during the update pet request.' });
  }
};

// update one pet owner id
exports.updatePetOwnerId = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Update a pets owner by pet Id'
  // #swagger.description = 'To update the pet owner id of a single pet, enter the pet Id and new pet owner id'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          petOwner: '65c6f5ecd51fdd04775b0a48'
        }
      }
    }
  }
  */
  const thisPetId = new ObjectId(req.params.id);
  const newPetOwner = {
    petOwner: req.body.petOwner
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .updateOne({ _id: thisPetId }, { $set: newPetOwner }, { upsert: false });
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'Pet not found' });
  } else {
    res.status(500).json({ error: 'An error occurred during the update pet request.' });
  }
};

/* DELETE REQUESTS */
// Delete a pet
exports.deletePet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Delete an existing pet by Id'
  // #swagger.description = 'This will delete a single pet from the database by pet Id. This action is permanent'
  const petId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('pets').deleteOne({ _id: petId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else if (response.deletedCount <= 0) {
    res.status(404).json({ error: 'Pet not found' });
  } else {
    res.status(500).json(response.error || 'An error occured while attempting to delete the pet.');
  }
};
