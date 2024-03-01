// oauthMiddleware.js

const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI;
const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];

async function oauthMiddleware(req, res) {
  try {
    const client = await authenticate({
      scopes: SCOPES,
      keyfilePath: path.join(process.cwd(), 'credentials.json')
    });

    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const user = await User.findOneAndUpdate(
      { googleId: client.credentials.id_token },
      {
        $set: {
          googleId: client.credentials.id_token,
          displayName: client.credentials.displayName,
          firstName: client.credentials.firstName,
          lastName: client.credentials.lastName,
          image: client.credentials.image
        }
      },
      { upsert: true, new: true }
    );

    req.user = user; // Attach user to request object
    req.session.user = user; // Create or update session with user info
    res.redirect('/dashboard'); // Redirect to dashboard route
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = oauthMiddleware;
