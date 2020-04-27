import { Schema } from 'mongoose';


//schema
let materialSchema = Schema({
    _id:          { type: mongoose.Schema.Types.ObjectId, index: true },
    Steps:        [
                    {type: mongoose.Schema.Types.ObjectId, index: true, ref:Step },
                    {type: mongoose.Schema.Types.ObjectId, index: true, ref:User },
                    {type: String, required: false } //remarks
                  ],
    Name:         { type: String, required: true  },
    PN:           { type: String, required: true, index: true}, //we can either use _id i.e., auto generated or we can create our own part number
    Timestamp:    { type: Date,   required: true  },
    Description:  { type: String, required: false }
});

let Material = module.exports = mongoose.model('Material', materialSchema);