import { Schema } from 'mongoose';


//schema
let userSchema = Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true},
    FirstName:{ type: String, required: true },
    LastName: { type: String, required: true },
    role:     { type: String, required: true },
    Password: { type: Password}
});

let User = module.exports = mongoose.model('User', userSchema);