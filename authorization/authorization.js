const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY=process.env.SECRET_KEY;

const authorization=(req,res,next)=>{
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(" ")[1];

    if(!token){
        console.log("there was no token");
        return res.status(400).json({message:"No token found"});
    }

    try{
        const verified = jwt.verify(token,SECRET_KEY);
        req.user=verified;
        next();
    }catch(err){
        console.error("Error has occured: ",err.message);
        res.status(400).json({error:"some error occured"});
    }


}
const verification=(req,res,next)=>{
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(" ")[1];

    if(!token){
        console.log("there was no token");
        return res.status(400).json({message:"No token found"});
    }

    try{
        const verified = jwt.verify(token,SECRET_KEY);
        req.user=verified;
        res.json({ valid: true});
    }catch(err){
        console.error("Error has occured: ",err.message);
        res.status(400).json({error:"some error occured"});
    }
}


module.exports = {authorization,verification};