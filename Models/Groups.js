import { Schema } from 'mongoose';


//schema
let GroupSchema = Schema({
    _id:        { type: mongoose.Schema.Types.ObjectId, index: true},
    CompanyMail:{ type: String, required: true },
    CompanyName:{ type: String, required: true },
    Categories: [{type: String, required: false}], 
});

let Group = module.exports = mongoose.model('Group', GroupSchema);