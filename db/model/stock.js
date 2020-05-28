const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

let stock = Schema({
    Name:         { type: String, required: true  },
    Quantity:     { type:Number, required:true, default:0},
    Description:  { type: String, required: false },
    company_id :  { type: Schema.Types.ObjectId, required: true, ref: 'company' },
});

let Stock = mongoose.model("Stock", stock);
module.exports = Stock;