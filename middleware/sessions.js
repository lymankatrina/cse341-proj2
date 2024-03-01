const session = require('express-session');
const MongoStore = require('connect-mongo');

function setupSession(app) {
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    })
  );
}

module.exports = setupSession;
