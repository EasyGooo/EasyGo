const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username })
  .lean()
  .then(foundUser => {
    

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    }
    next(null, foundUser);
  })
  .catch((err) =>{
    if (err) {
      next(err);
      return;
    }
  });
}));
