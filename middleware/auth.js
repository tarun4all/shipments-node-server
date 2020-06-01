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
            let url=req.url.split('/');
            req.user = user;
            if(user.roles[url[1]] && user.roles[url[1]].includes(url[2])) //checking user permission against the api
                next();
            else next('Not enough permission');
        }
        else{next("some error occured");} 
        })(req, res, next);
    },
    resetPassword : function(req, res, next) {
        next();
    }
};