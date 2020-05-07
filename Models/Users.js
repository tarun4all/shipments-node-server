import { Schema } from 'mongoose';



let userSchema = Schema({
    _id:      { type: mongoose.Schema.Types.ObjectId, index: true},
    FirstName:{ type: String, required: true },
    LastName: { type: String, required: true },
    Role:     { type: String, required: true },
    Group:    { type: mongoose.Schema.Types.ObjectId, index: true, ref:Group },
    Email:    { type: String, required: true }, //TODO add validation
    Password: { type: String , required: true},
    
});

let User = module.exports = mongoose.model('User', userSchema);