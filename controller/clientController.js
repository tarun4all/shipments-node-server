const Joi = require('@hapi/joi');
const CompanyModel = require("../db/model/company");

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
            services.user.create(data['_id'], value);
            res.send("done");
        }
    }
}

const login = async (req, res, next) => {
    res.send("done");
}

module.exports = {
    signup,
    login,
}