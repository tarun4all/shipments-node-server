import { Schema } from 'mongoose';

//schema
let productSchema = Schema({
    _id:      { type: mongoose.Schema.Types.ObjectId, index: true },
    Name:     { type: String, required: true, index: true},
    Qualtity: { type: Number, required: true },
    Steps:    [
                {type: Number, required: true }, //step number
                {type: String, required: true }, //description
                {type: mongoose.Schema.Types.ObjectId, ref:Product, required: false}, //material id
                {type: Number, required: false } // how much of the item
              ],
    PN:       { type: mongoose.Schema.Types.ObjectId, index: true, ref:Material, required: true},
    //can also add image
});

let Product = module.exports = mongoose.model('Product', productSchema);