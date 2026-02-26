const mongoose = require("mongoose");
const route = process.env.mongo_route;
async function connectdb(){
    try{
        await mongoose.connect(`mongodb://${route}`);
        console.log("Connected to database res_products @__@ ");
    }catch(err){
        console.log("Error occured:\n");
        console.error(err.message);
    }
}
module.exports=connectdb;