const express = require('express');
const dotenv = require('dotenv');
const { connectDb } = require('./config/connect');
const cors = require('cors');
const mongodb = require('./db/connect');
const authMiddleware = require('./middleware/authMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // .use(sessionMiddleware) // Start a session so there is a place to store things between redirects
  .use(authMiddleware.authMiddleware)
  .use('/', routes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Connected to DB and Web Server is running on port ${PORT}`);
  });
});
