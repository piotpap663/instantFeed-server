const User = require('../Models/User');
let LocalStrategy = require('passport-local').Strategy;
module.exports = () => {
  return new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, user, password, done) {
      User.findOne({ user }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
}