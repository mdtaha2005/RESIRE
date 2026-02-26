const express=require("express");
const Product = require("../model/model.js");
const newProd = async(req,res)=>{
    try{

    const { name, price, image,ad_images, description,tags } = req.body;

    // Count existing products to get the next displayOrder value
    const count = await Product.countDocuments();

    const newProduct = new Product({
      name,
      price,
      image,
      ad_images: ad_images
        ? ad_images.split(",").map(img => img.trim()).filter(Boolean)               
        : [],
      description,
      tags,
      displayOrder: count + 1 // 👈 last position
    });
    console.log(newProduct.ad_images);
    await newProduct.save();
    res.status(201).json({ msg: 'Product added successfully', product: newProduct });
    console.log(`Product ${newProduct} added to database`);
    }catch(err){
        console.error("error occured",err.message)
        res.status(400).json({error:`Error occured: ${err.message}`})
    }
}

const allProd = async(req,res)=>{
    try{
        const allprods = await Product.find().sort({ displayOrder: 1 });
        
        res.status(200).json(allprods);
    
    }catch(err){
        res.status(400).json({error:`Error Occured: ${err.message}`});
    }
}

const prod_page = async(req,res)=>{
  try{
    const prod= await Product.findById(req.params.id);
    if(!prod){
      console.log("prod not found");
      return res.status(400).json({message:"Product not found"});
    }
    res.json(prod);
    console.log("Product sent");
  }catch(err){
    console.error(err);
    return res.status(400).json({message:"Error occured"})
  }
}

const categories = async(req,res)=>{
    try{
        console.log(req.body);
        const categ = (await Product.find({tags:req.body.tags}));
        console.log(`Products of ${req.body.tags} sent: ${categ}`);
        res.status(200).json(categ);
    }catch(err){
        console.error(err);
        res.status(400).json({message:"Error occured"});
    }
}

const allcat=async (req, res) => {
  try {
    const categories = await Product.distinct("tags");
    const formatted = categories.map(tag => ({ name: tag })); // frontend expects { name: ... }
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const updateProd = async (req, res) => {
  try {
    if (req.body.ad_images) {
      if (typeof req.body.ad_images === "string") {
        req.body.ad_images = req.body.ad_images
          .split(",")
          .map(img => img.trim())
          .filter(Boolean);
      } else if (Array.isArray(req.body.ad_images)) {
        req.body.ad_images = req.body.ad_images
          .map(img => img.trim())
          .filter(Boolean);
      }
    }

    const prodt = await Product.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prodt) {
      return res.status(404).json({ error: `Product ${req.params._id} not found in database` });
    }

    res.status(200).json({ message: `Product was updated to ${prodt.name}`, product: prodt });
    console.log(`✅ Product updated: ${prodt.name}`);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(400).json({ error: `Error occurred: ${err.message}` });
  }
};

const deltProd = async(req,res)=>{
    try{
        const prodt = await Product.findByIdAndDelete(req.params._id);
        if(!prodt){
            console.log(`Product ${prodt.name} not found in database`);
            return res.status(404).json({error:`Product ${prodt.name} not found in database`})
        }
        res.status(200).json({message:`Product ${prodt.name} was deleted`})
        console.log(`Product ${prodt.name} deleted from database`);
    }catch(err){
        res.status(400).json({error:`Error Occured: ${err.message}`});
    }
}
const move_priority= async (req, res) => {
  try {
    const { productId, direction } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const swapProduct = await Product.findOne({
      displayOrder: product.displayOrder + direction
    });

    if (!swapProduct) return res.status(400).json({ msg: 'Cannot move further' });

    const temp = product.displayOrder;
    product.displayOrder = swapProduct.displayOrder;
    swapProduct.displayOrder = temp;


    await product.save();
    await swapProduct.save();


    res.json({ msg: 'Product moved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports={newProd,move_priority,allcat,allProd,prod_page,categories,updateProd,deltProd}
/* request
{
  "name": "someee",
  "price": "priceless",
  "image": "dddss",
  "description": "fffff"
}
*/