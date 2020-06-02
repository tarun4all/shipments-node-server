const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

let stock = Schema({
    name:         { type: String, required: true  },
    quantity:     { type:Number, required:true, default:0},
    description:  { type: String, required: false },
    company_id :  { type: Schema.Types.ObjectId, required: true, ref: 'company' },
});

let Stock = mongoose.model("Stock", stock);
module.exports = Stock;