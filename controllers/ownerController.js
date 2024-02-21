const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* GET REQUESTS */
// get all owners
exports.getAllOwners = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get all Owners'
  // #swagger.description = 'This will list all owners in the database'
  const result = await mongodb.getDb().db().collection('owners').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// get a single owner
exports.getSingleOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get a single owner by ID'
  // #swagger.description = 'This will return a single owner in the database by owner Id'
  const ownerId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('owners').find({ _id: ownerId });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Owner not found' });
    }
  });
};

// get owner by single pet Id
exports.getOwnerByPet = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Get a pets owner by pet Id'
  // #swagger.description = 'This will return the owner associated with a single pet in the database by pet Id'
  const petId = req.params.pets;
  const result = await mongodb
    .getDb()
    .db()
    .collection('owners')
    .find({ pets: { petId: petId } });
  result.toArray().then((owners) => {
    if (owners.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(owners);
    } else {
      res.status(404).json({ error: 'No owners found by that pet Id' });
    }
  });
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
    pets: [{ petId: req.body.pets }]
  };
  const response = await mongodb.getDb().db().collection('owners').insertOne(owner);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(404).json({ error: 'Owner could not be created' });
  }
};

/* PUT REQUESTS */
// update one owner
exports.updateOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Update an Owner by Id'
  // #swagger.description = 'Update an existing owner by providing all required information.'
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
            { petId: "65c6f5ecd51fdd04775b0a48" }, { petId: "65c6f726d51fdd04775b0a54" }
          ]
        }
      }
    }
  }
  */
  const ownerId = new ObjectId(req.params.id);
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
    pets: [{ petId: req.body.pets }]
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('owners')
    .replaceOne({ _id: ownerId }, owner);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'Owner not found' });
  } else {
    res.status(500).json({ error: 'An error occurred during the update owner request.' });
  }
};

/* DELETE REQUESTS */
// Delete an owner
exports.deleteOwner = async (req, res) => {
  // #swagger.tags = ['Owners']
  // #swagger.summary = 'Delete an Owner by Id'
  // #swagger.description = 'This will delete a single owner from the database by Id. This action is permanent.'
  const ownerId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('owners').deleteOne({ _id: ownerId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else if (response.deletedCount <= 0) {
    res.status(404).json({ error: 'Owner not found' });
  } else {
    res
      .status(500)
      .json(response.error || 'An error occured while attempting to delete the owner.');
  }
};
