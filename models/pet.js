const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  species: { type: String, enum: ['DOG', 'CAT'], required: true },
  petBreed: [{ type: String }],
  mixedBreed: { type: Boolean, required: true },
  petMarkings: { type: String, required: true },
  petSex: { type: String, enum: ['MALE', 'FEMALE'], required: true },
  petImage: { type: String, required: false },
  petOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }
});

module.exports = mongoose.model('Pet', PetSchema);
