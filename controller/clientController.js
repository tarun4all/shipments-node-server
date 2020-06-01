const Joi = require('@hapi/joi');

//db models
const CompanyModel = require("../db/model/company");
const UserModel = require("../db/model/user");

//utilities
const bcrypt = require('bcrypt');
const convertObjectID = require('mongoose').Types.ObjectId;

const userPermission = require("../config/userPermissions") //getting user permission from config

const generateAuthToken = (user) => {
    let { _id, company_id } = user, token = { _id, company_id, expire: (new Date((new Date).getTime() + 24*60*60*1000)) };
    console.log(token);
    return {token: services.encrypt.encode(JSON.stringify(token))};
}

const signup = async (req, res, next) => {
    const schema = Joi.object().keys({
        companyName: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        phone: Joi.string().trim().required(),
        age: Joi.number().required(),
        gender: Joi.string().trim().valid('m', 'f', 'other').required(),
        password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      });

    const { error, value } = schema.validate(req.body);
    if (error) {
        next({error, status: ''});
    } else {
        const company = new CompanyModel({ name: value.companyName })
        const data = await company.save().catch(err => { next(err); });

        if(data) {
            //TODO to make salt with config file
            value.password = await bcrypt.hash(value.password, 10).catch(err => {next(err)});
            value.roles=userPermission.val.owner; 
            console.log('user', value);
            services.user.create(data['_id'], value);
            res.send("done");
        }
    }
}

const createEmployee = async (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        phone: Joi.string().trim().required(),
        age: Joi.number().required(),
        gender: Joi.string().trim().valid('m', 'f', 'other').required(),
        password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      });

    const { error, value } = schema.validate(req.body);
    if (error) {
        next({error, status: ''});
    } else {
        //TODO to make salt with config file
        value.password = await bcrypt.hash(value.password, 10).catch(err => {next(err)});
        value.company_id = req.user.company_id;
        value.roles=userPermission.val.employee;
        console.log('user', value);
        services.user.create(req.user['_id'], value);
        res.send("done");
    }
}

const showEmployee = async (req, res, next) => {
    if(req.user && req.user.company_id) {
        UserModel.find({company_id: req.user.company_id}, 'name gender email phone').then((data) => {
            res.send(Array.isArray(data) && data.length ? data : []);
        }).catch((err) => {
            next(err);
        });
    }
}

const forgetPassword = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().trim().email(),
        token: Joi.string().trim().token(),
        password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    const { error, value } = schema.validate(req.body);
    if (!error) {
        if(value.email) {
            UserModel.findOne({email: value.email}).then(data => {
                if(data) {
                    const token = generateAuthToken(data);

                    //TODO mail service to send email token
                    res.send(token);
                } else {
                    next("Invalid email");
                }
            });
        } else if(value.token && value.password) {
            try {
                const {_id, company_id} = services.encrypt.decode(value.token);
                console.log(value.token);
                UserModel.findOne({_id, company_id}).then(async (data, err) => {
                    console.log(data);
                    if(data) {
                        data.password = await bcrypt.hash(value.password, 10).catch(err => {next(err)});
                        data.save();
                        res.send("password updated");
                    } else {
                        next("Invalid token");
                    }
                });
            } catch(err) {

            }
        } else {
            next("Invalid parameters");
        }
    } else {
        next(error);
    }
}

module.exports = {
    signup,
    createEmployee,
    showEmployee,
    forgetPassword,
}