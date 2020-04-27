import { Schema } from 'mongoose';


//schema
let stepSchema = Schema({
    _id:            { type: mongoose.Schema.Types.ObjectId, index: true, required: true },
    Step_Number:    { type: Number, required: true},
    Material_used:  [{type: mongoose.Schema.Types.ObjectId, index: true, ref:Material}],
    Final_Material: { type: mongoose.Schema.Types.ObjectId, index: true, ref:Material, required: true},
});

let Step = module.exports = mongoose.model('Step', stepSchema);