const mongoose = require("mongoose");
const prodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    ad_images:{type:[String]},
    description: { type: String, required: true },
    tags:{type:String },
    displayOrder:{ type: Number, default: 0 }
})
const Product=mongoose.model("Product",prodSchema);

module.exports=Product;