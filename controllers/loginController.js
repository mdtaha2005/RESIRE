const express=require("express");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const bcrypt = require("bcrypt");



const login = async (req,res)=>{
    const {username,password}=req.body;
    const user1 =await User.findOne({username});
    if(!user1){
        console.log("User not found");
        return res.status(400).json({error:"User not found"});
    }
    const isMatch = await bcrypt.compare(password,user1.password);
    if(!isMatch){
        console.log("invalid password")
        return res.status(401).json({error:"invalid password"});
    }
    const token = jwt.sign({id:user1._id,username:user1.username},process.env.SECRET_KEY,{expiresIn:"1h"});
    res.status(201).json({ token });
    console.log("Login done,token sent");
}

module.exports={login};