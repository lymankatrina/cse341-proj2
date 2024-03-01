// bring in Model
const Pet = require('../models/Pet');

/* GET REQUESTS */
// get all pets
exports.getAllPets = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get all Pets'
  // #swagger.description = 'This will list all pets in the database'
  try {
    const pets = await Pet.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: pets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get a single pet
exports.getSinglePet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get a single pet by ID'
  // #swagger.description = 'This will return a single pet in the database by pet Id'
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    if (pet) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ data: pet });
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all pets by single owner Id
exports.getPetsByOwner = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get pets by owner Id'
  // #swagger.description = 'This will return a list of all pets associated with a single owner in the database by petOwner Id'
  try {
    const petOwnerId = req.params.id;
    const pets = await Pet.find({ petOwner: petOwnerId });
    if (pets.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ data: pets });
    } else {
      res.status(404).json({ error: 'No pets found by that owner Id' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all pets by species
exports.getPetsBySpecies = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Get all pets by species'
  // #swagger.description = 'This will return a list of all pets by species'
  try {
    const petSpecies = req.params.species;
    const pets = await Pet.find({ species: petSpecies });
    if (pets.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ data: pets });
    } else {
      res
        .status(404)
        .json({ error: 'No pets found by that species. Available species are DOG or CAT' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
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
  try {
    const pet = new Pet(req.body);
    //   petName: req.body.petName,
    //   species: req.body.species,
    //   petBreed: req.body.petBreed,
    //   mixedBreed: req.body.mixedBreed,
    //   petMarkings: req.body.petMarkings,
    //   petSex: req.body.petSex,
    //   petImage: req.body.petImage,
    //   petOwner: req.body.petOwner
    // });
    const newPet = await pet.save();
    res.status(201).json({ data: newPet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
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
  try {
    const petId = req.params.id;
    const pet = req.body;
    const updatedPet = await Pet.findByIdAndUpdate(petId, pet, { new: true });
    if (!updatedPet) {
      res.status(404).json({ error: 'Pet not found' });
    } else {
      res.status(200).json({ data: updatedPet });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update one pet owner id
exports.updatePetOwnerId = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Update a pets pet owner by pet Id'
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
  try {
    const petId = req.params.id;
    const newPetOwner = req.body.petOwner;
    const pet = await Pet.findByIdAndUpdate(petId, { petOwner: newPetOwner }, { new: true });
    if (!pet) {
      res.status(404).json({ error: 'Pet not found' });
    } else {
      res.status(200).json({ data: pet });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* DELETE REQUESTS */
// Delete a pet
exports.deletePet = async (req, res) => {
  // #swagger.tags = ['Pets']
  // #swagger.summary = 'Delete an existing pet by Id'
  // #swagger.description = 'This will delete a single pet from the database by pet Id. This action is permanent'
  try {
    const petId = req.params.id;
    const pet = await Pet.findByIdAndDelete(petId);
    if (pet) {
      res.status(200).json({ message: 'Pet deleted successfully' });
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
