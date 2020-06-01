const UserModel = require("../db/model/user");
const convertObjectID = require('mongoose').Types.ObjectId;

module.exports = {
    name: 'user',
    val: {
        create: (company_id, userData) => {
            const user = new UserModel({
                company_id: convertObjectID(company_id),
                ...userData
            });
            user.save(function (err, result) {
                console.log(err, result);
            });
        },
        update:(id, value) =>{
            console.log('id and user', id, value);
            UserModel.updateOne({_id:id}, value, function(err, result){
                console.log(err, result);
            })
        }
    }
}