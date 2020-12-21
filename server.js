const path = require('path');
const express = require('express');
const session = require('express-session');

// Create new sequlize store using express session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super Secret Tedska Doodle',
  cookei: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Set Midleware
// Add express-session and store as Express.js
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Initialize/Syncronize server to db
sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log('Listening now.'));
});
