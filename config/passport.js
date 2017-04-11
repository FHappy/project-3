var passport                    = require('passport');
var LocalStrategy               = require('passport-local').Strategy;
var mongoose                    = require('mongoose');
// var User                        = require('mongoose').model('User');


module.exports = function() {
  var User = mongoose.model('User');
  passport.use(new LocalStrategy({
          usernameField: 'email'
      },
      function(username, password, done) {
          User.findOne({
              email: username
          }, function(err, user) {
              if (err) {return done(err);}
              if (!user) {
                  return done(null, false, {
                      message: 'User not found'
                  });
              }
              if (!user.validPassword(password)) {
                  return done(null, false, {
                      message: 'Incorrect password'
                  });
              }
              return done(null, user);
          });
      }));
}
