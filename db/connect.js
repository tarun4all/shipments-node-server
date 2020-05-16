const mongoose = require("mongoose");
// const Schema  = mongoose.Schema;
// const userSchema = new Schema({name : String, sex : String , designation : String});
// const User = mongoose.model("users",userSchema);

// User.insertMany([{name: 'Tarun Bansal', sex: 'Male', designation: 'Full stack Developer'}, {name: 'Danish', sex: 'Female', designation: 'CTO'}], (err, docs) => {
//     if(err) console.log('error occures while inserting..');
//     if(docs) console.log('Test Data inserted');
// });

module.exports = (MONGODB_URL = '') => {
    return new Promise((resolve, reject) => {
        mongoose.connect(MONGODB_URL || process.env.MONGODB_URL || "mongodb://localhost:27017/tracksys", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if(err) return reject(false);
            return resolve(true);
        });
    });
};