const express = require('express');
const auth = express.Router();
const passport = require('passport');

const Repository = require('../db/user-repository');
/*
    The login will apply the Passport filter to check if provided
    username/password are correct.
    See "passport.use(new LocalStrategy" in app.js
 */
auth.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(204).send();
});

auth.post('/signup', function (req, res) {
  const created = Repository.createUser(req.body.userId, req.body.password);
  if (!created) {
    res.status(400).send();
    return;
  }

  passport.authenticate('local')(req, res, () => {
    req.session.save((err) => {
      if (err) {
        //shouldn't really happen
        res.status(500).send();
      } else {
        res.status(201).send(created);
      }
    });
  });
});

auth.post('/logout', function (req, res) {
  req.logout();
  res.status(204).send();
});

/*
    Provide info on logged in user
 */
auth.get('/user', (req, res) => {
  /*
        If a user is logged in by providing the right session cookie,
        then Passport will automatically instantiate a valid User object
        and add it to the incoming "req" object
     */

  if (req.user) {
    return res.status(200).send({
      userId: req.user.id,
      user: req.user,
    });
  }

  res.status(401).send();
});

module.exports = auth;
