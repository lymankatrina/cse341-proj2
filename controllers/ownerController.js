const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');

/* POST REQUESTS */
// create an owner
exports.createOwner = async (req, res) => {
  try {
    const owner = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pets: [req.body.pets]
    };
    const response = await mongodb.getDb().db().collection('owners').insertOne(owner);
    if(response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(404).json({ error: 'Owner could not be created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET REQUESTS */
// get all owners
exports.getAllOwners = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('owners').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('An error occurred while retrieving all owners:', error);
    res.status(500).json({ error: 'An error occurred while retrieving all owners' });
  }
};

 // get a single owner
 exports.getSingleOwner = async (req, res) => {
  try {
    const ownerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('owners').find({ _id: ownerId }).toArray();
    if(result.length >0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Owner not found' });
    }
  } catch (error) {
    console.error('An error occurred while retrieving a single owner:', error);
    res.status(500).json({ error: 'An error occurred while retrieving a single owner' });
  }
};

/* PUT REQUESTS */
 // update one owner
exports.updateOwner = async (req, res) => {
  try {
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
    pets: [req.body.pets]
  };
  const response = await mongodb.getDb().db().collection('owners').replaceOne({ _id: ownerId }, owner);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Owner not found' });
  }
} catch (error) {
  console.error('An error occurred during the update owner request:', error);
  res.status(500).json({error: 'An error occurred during the update owner request.'});
  }
 };

 /* DELETE REQUESTS */
 // Delete an owner
 exports.deleteOwner = async (req, res) => {
  const ownerId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('owners').deleteOne({ _id: ownerId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occured while attempting to delete the owner.');
  }
 };
