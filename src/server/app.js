const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const morgan = require('morgan');

const Users = require('./db/user-repository');
const authApi = require('./routes/auth-api');
const userAPI = require('./routes/user-api');

const seed = require('./seed');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

app.use(
  session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
    },
    function (userId, password, done) {
      const authenticated = Users.verifyUser(userId, password);

      if (!authenticated) {
        return done(null, false, { message: 'Invalid username/password' });
      }

      const user = Users.getUser(userId);
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = Users.getUser(id);

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

//Menu is open to anyone

// Closed unless is logged in
// If somehow manage to get to create page and trying to post data, server will respond with 401

app.use('/api', authApi);
app.use('/api', userAPI);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  seed.seedData();
  console.log('Started server on port ' + port);
});

module.exports = { app };
