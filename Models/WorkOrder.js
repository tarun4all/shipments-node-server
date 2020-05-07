import { Schema } from 'mongoose';


//schema
let workOrderSchema = Schema({
    _id:           { type: mongoose.Schema.Types.ObjectId, index: true  },
    Client_id:     { type: mongoose.Schema.Types.ObjectId, ref: Client, index:true },
    Product:       { type: mongoose.Schema.Types.ObjectId, ref: Product },
    Quantity:      { type: Number, required: true },
    Created_on:    { type: Date,   required: true },
    Created_by:    { type: mongoose.Schema.Types.ObjectId, ref:User, index: true },
});

let WorkOrder = module.exports = mongoose.model('WorkOrder', workOrderSchema);