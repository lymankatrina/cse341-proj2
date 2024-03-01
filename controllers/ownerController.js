// bring in Model
const Owner = require('../models/Owner');

/* GET REQUESTS */
// get all owners
exports.getAllOwners = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get all Owners'
  // #swagger.description = 'This will list all owners in the database'
  try {
    const owners = await Owner.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(owners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get a single owner
exports.getSingleOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get a single owner by ID'
  // #swagger.description = 'This will return a single owner in the database by owner Id'
  try {
    const ownerId = req.params.id;
    const owner = await Owner.findById(ownerId);
    if (owner) {
     res.setHeader('Content-Type', 'application/json')
      res.status(200).json(owner);
    } else {
      res.status(404).json({ error: 'Owner not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get owner by single pet Id
exports.getOwnerByPet = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get a pets owner by pet Id'
  // #swagger.description = 'This will return the owner associated with a single pet in the database by pet Id'
  try {
    const petId = req.params.pets;
    const owners = await Owner.find({ pets: { $elemMatch: { petId: petId } } });
    if (owners.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(owners);
    } else {
      res.status(404).json({ error: 'No owners found by that pet Id' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* POST REQUESTS */
// create an owner
exports.createOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Create an Owner'
  // #swagger.description = 'Create an Owner by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          firstName: "John",
          lastName: "Doe",
          birthdate: "01/13/1999",
          phone: 8015550100,
          email: "johndoe@gmail.com",
          address: "123 N. Some Street",
          city: "Some City",
          state: "UT",
          zip: 84000,
          pets: [
            { petId: "65c6f5ecd51fdd04775b0a48" },
            { petId: "65c6f726d51fdd04775b0a54" }
          ]
        }
      }
    }
  }
  */
  try {
    const owner = new Owner({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      pets: req.body.pets
    });
    const newOwner = await owner.save();
    res.status(201).json(newOwner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* PUT REQUESTS */
// update one owner
exports.updateOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Update an Owner by Id'
  // #swagger.description = 'Update an existing owner by providing all required information.'
  /*
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          firstName: "John",
          lastName: "Doe",
          birthdate: "01/13/1999",
          phone: 8015550100,
          email: "johndoe@gmail.com",
          address: "123 N. Some Street",
          city: "Some City",
          state: "UT",
          zip: 84000,
          pets: [
            { petId: "65c6f5ecd51fdd04775b0a48" },
            { petId: "65c6f726d51fdd04775b0a54" }
          ]
        }
      }
    }
  }
  */
  try {
    const ownerId = req.params.id;
    const owner = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      pets: req.body.pets
    };
    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, owner, { new: true });
    if (updatedOwner) {
      res.status(200).json(updatedOwner);
    } else {
      res.status(404).json({ error: 'Owner not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add Pet Id(s) to Owner
exports.updateOwnerPetIds = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Add Pet Id's to an Owner by Owner Id'
  // #swagger.description = 'Update an existing owner by adding Pet Id numbers.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        example: {
          pets: "65c6f5ecd51fdd04775b0a48"
        }
      }
    }
  }
  */
  try {
    const ownerId = req.params.id;
    const petIds = req.body.pets;
    const owner = await Owner.findByIdAndUpdate(ownerId, { $addToset: { pets: petIds } });
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during the update owner request.' });
  }
};

/* DELETE REQUESTS */
// Delete an owner
exports.deleteOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Delete an Owner by Id'
  // #swagger.description = 'This will delete a single owner from the database by Id. This action is permanent.'
  try {
    const ownerId = req.params.id;

    const owner = await Owner.findByIdAndDelete(ownerId);

    if (!owner) {
      res.status(404).json({ error: 'Owner not found' });
    }
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while attempting to delete the owner.' });
  }
};
