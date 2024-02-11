// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const OwnerSchema = new Schema({
//   firstName: { 
//     type: String, 
//     required: 'Enter a first name' 
//   },
//   lastName: { 
//     type: String,
//     required: 'Enter a last name'
//   },
//   birthdate: {
//     type: String,
//     required: 'Enter birthdate MM/DD/YYYY'
//   },
//   phone: {
//     type: Number, 
//     required: 'Enter 10 digit Phone Number'
//   },
//   email: {
//     type: String,
//     required: 'Enter email address'
//   },
//   address: {
//     type: String,
//     required: 'Enter street address'
//   },
//   city: {
//     type: String,
//     required: 'Enter city'
//   },
//   state: {
//     type: String,
//     required: 'Enter state abreviation'
//   },
//   pets: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Pet'
//   }]
// });

// module.exports = mongoose.model("Owner", OwnerSchema);