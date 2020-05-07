import { Schema } from 'mongoose';


//for each semiFinishedProduct
let semiFinishedProduct = Schema({
    _id:          { type: mongoose.Schema.Types.ObjectId, index: true }, //SN
    FinalProduct: { type: mongoose.Schema.Types.ObjectId, ref: Product, index: true},
    Name:         { type: String, required: true  },
    PN:           { type: String, required: true, index: true},
    Steps:        [
                    {type: mongoose.Schema.Types.ObjectId, index: true, ref:User },
                    {type: Number, required: true }, //step number
                    {type: Date,   required: true }, //timestamp
                    {type: String, required: false} //remarks
                  ],  
    Description:  { type: String, required: false }
    
    //when all the steps are done, value added to Product Model. 
});

let Material = module.exports = mongoose.model('Material', materialSchema);