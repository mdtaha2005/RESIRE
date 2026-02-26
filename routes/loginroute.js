const express = require("express");
const path = require("path");
const {login} = require("../controllers/loginController.js")
const router = express.Router();


const {verification} = require("../authorization/authorization.js");
router.post("/",login);
router.get("/verify_token",verification);
// router.get("/verify_token",(req,res)=>{
//     const authheader = req.headers["authorization"];
//     const token = authheader && authheader.split(" ")[1];
    
//     if(!token){
//         console.log("Theres no token");
//         return res.status(400).json({message:"There is no token here"});
//     }

//     try{
//         const verified = jwt
//     }




// })



module.exports=router;