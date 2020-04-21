import { Schema } from 'mongoose';


//schema
let userSchema = Schema({
    FirstName:{ type: String, required: true },
    LastName: { type: String, required: true },
    role:     { type: String, required: true },
});

let User = module.exports = mongoose.model('User', userSchema);