const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const convertObjectID = require('mongoose').Types.ObjectId;

//imports db models
const UserModel = require("../db/model/user");

const errorMessage = {
    loginError: 'Unable to authenticate with the provided email and password.',
    tokenAuthError: 'Unable to authenticate with the provided token.'
};

const generateAuthToken = (user) => {
    let { _id, company_id } = user, token = { _id, company_id, expire: (new Date((new Date).getTime() + 24*60*60*30000)), type:'access_token' };
    return { access_token: services.encrypt.encode(JSON.stringify(token)), token_type: 'bearer', expires_in: token.expire.getTime()/1000 };
}

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    UserModel.findOne({email}).then((data) => {
        bcrypt.compare(password, data.password, function(err, result) {
            if(result) done(null, generateAuthToken(data));
            else done(true);
        });
    }).catch((err) => {
        done(err);
    });
}));

passport.use(new BearerStrategy((token, done) => {
    try {
        console.log(services.encrypt.decode(token))
        const { _id, company_id, expire, type } = JSON.parse(services.encrypt.decode(token));
        if(type == "access_token" && (new Date(expire) > (new Date().getTime()/1000))) {
            UserModel.findOne({_id: convertObjectID(_id), company_id: company_id}).then((data) => {
                console.log(data);
                if(data) {
                    done(null, {_id: data._id, company_id: data.company_id, email: data.email});
                } else done(true);
            }).catch((err) => {
                done(true);
            });
        } else {
            done(true);
        }
        
    } catch (error) {
        console.log(error)
        done(true);
    }
}));