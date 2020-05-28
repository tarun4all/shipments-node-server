const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    name : { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String},
    age: { type: Number},
    gender: { type: String},
    password: { type: String, required: true},
    company_id : { type: Schema.Types.ObjectId, required: true, ref: 'company' },
    roles: {},
});

let User = mongoose.model("User", userSchema);
module.exports = User;