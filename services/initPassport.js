const passport = require('passport');
const localStrategy = require('./LocalStrategy');

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  passport.use(
    localStrategy()
  );
}