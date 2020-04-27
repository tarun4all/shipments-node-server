import { Schema } from 'mongoose';


//schema
let workOrderSchema = Schema({
    _id:           { type: mongoose.Schema.Types.ObjectId, index: true  },
    product:       { type: mongoose.Schema.Types.ObjectId, ref: Product },
    Shipping_Info: { type: String, required: true },
    Created_on:    { type: Date,   required: true },
    Created_by:    { type: mongoose.Schema.Types.ObjectId, ref:User, index: true },
});

let WorkOrder = module.exports = mongoose.model('WorkOrder', workOrderSchema);