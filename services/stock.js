const StockModel = require("../db/model/stock");

module.exports={
    name:"stock",
    val:{
        createMany: (stocks)=>{
            StockModel.insertMany(stocks).then(function(){ 
                console.log("Data inserted")  // Success 
            }).catch(function(error){ 
                console.log(error)      // Failure 
            }); 
        }
    }
}