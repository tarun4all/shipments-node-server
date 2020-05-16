const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const comapnySchema = new Schema({
    name : { type: String, required: true},
    subdomain : { type: String},
    verified: { type: Boolean, default: false},
});

let Company = mongoose.model("Company", comapnySchema);

module.exports = Company;