import { Schema } from 'mongoose';


//schema
let productSchema = Schema({
    _id:    { type: mongoose.Schema.Types.ObjectId, index: true },
    steps:  [{type: mongoose.Schema.Types.ObjectId, index: true, ref:Step }],
    PN:     { type: mongoose.Schema.Types.ObjectId, index: true, ref:Material, required: true},
});

let Product = module.exports = mongoose.model('Product', productSchema);