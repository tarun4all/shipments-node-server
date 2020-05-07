import { Schema } from 'mongoose';


//schema
let clientSchema = Schema({
    _id:           { type: mongoose.Schema.Types.ObjectId, index: true },
    Name:          { type: String, required: true },
    Email:         { type: String, required: true }, // TODO add validation
    PhoneNumber:   { type: Number, required: true }, // TODO can be string or Number if paranthesis '()' is needed, add validation
    Remarks:       { type: String, required: true },
});

let Client = module.exports = mongoose.model('Client', clientSchema);