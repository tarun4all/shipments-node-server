const passport = require('passport');

module.exports = {
    loginValidate: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if(err) next("Invalid credentials");
          else res.send(user);
        })(req, res, next);
    },
    validateUser:  function(req, res, next) {
        passport.authenticate('bearer', { session: false }, function(err, user, info) {
          if(err) next("Invalid Token");
          else {
              req.user = user;
              next();
          }
        })(req, res, next);
    },
    resetPassword : function(req, res, next) {
        next();
    }
};