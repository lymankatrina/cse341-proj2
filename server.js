const express = require('express');
const dotenv = require('dotenv');
const { connectDb } = require('./config/connect');
const cors = require('cors');
// const setupSession = require('./middleware/sessions');
// const oauthMiddleware = require('./middleware/oauthMiddleware');

// Load config
dotenv.config({ path: './config/.env' });

connectDb().then(() => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  // app.use(express.json());
  // setupSession(app);
  app.use(cors());
  // app.use(oauthMiddleware);
  app.use('/', require('./routes'));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Connected to DB and Web Server is running on port ${PORT}`);
  });
});
