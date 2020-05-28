const passport = require('passport');
const UserModel = require("../db/model/user");

module.exports = {
    loginValidate: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if(err) next("Invalid credentials");
          else res.send(user);
        })(req, res, next);
    },
    validateUser: function(req, res, next) {
        passport.authenticate('bearer', { session: false }, function(err, user, info) {
          if(user){
            req.user = user;
            
            console.log('user',user);
            console.log('url', req.url);
            let url=req.url.split('/');

            console.log('auth user',user);
            // console.log('does user have permission',user.roles[url[1]].includes(url[2]));

            
            next();
        }
        else{next("some error occured");} 
        })(req, res, next);
    },
    resetPassword : function(req, res, next) {
        next();
    }
};