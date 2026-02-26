require("dotenv").config();
const uploadRoutes = require("./routes/uploadImage.js");
const express = require("express");
const app = express();
const path = require('path');

app.use(express.static('public/chatgptweb'));
app.use(express.static('public'));
const prodroutes = require("./routes/prodRoutes.js");
const logins =require("./routes/loginroute.js");
const cors = require('cors');
app.use(cors());
const connectdb = require("./connectdb.js");
connectdb();

app.use("/routes", uploadRoutes);

const port = process.env.PORT || 10000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("RESIRE")
    console.log("sent")
})
app.get("/admin",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','admin.html'));
})
app.use("/login",logins);
app.use("/routes",prodroutes);
app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})