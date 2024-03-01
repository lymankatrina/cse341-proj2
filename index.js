// const path = require('path');
// const process = require('process');
// const { authenticate } = require('@google-cloud/local-auth');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config/.env' });
// const mongoose = require('mongoose');
// const User = require('./models/User');

// // MongoDB connection URI
// const MONGODB_URI = process.env.MONGODB_URI;

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];

// async function authorize() {
//   try {
//     const client = await authenticate({
//       scopes: SCOPES,
//       keyfilePath: path.join(process.cwd(), 'credentials.json')
//     });

//     // Use the google auth user information to create or update a user in MongoDB
//     await mongoose.Connection(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     const user = await User.findOneAndUpdate(
//       { googleId: client.credentials.id_token },
//       {
//         $set: {
//           googleId: client.credentials.id_token,
//           email: client.credentials.id_token.email,
//           displayName: client.credentials.displayName,
//           firstName: client.credentials.firstName,
//           lastName: client.credentials.lastName,
//           image: client.credentials.image
//         }
//       },
//       { upsert: true, new: true }
//     );

//     return user;
//   } catch (err) {
//     console.error('Authorization error:', err);
//   }
// }

// authorize()
//   .then((user) => {
//     console.log('User created/updated:', user);
//   })
//   .catch(console.error);
