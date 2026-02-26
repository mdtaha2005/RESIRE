const express= require("express");

const router=express.Router();
const {newProd,move_priority,categories,prod_page,allProd,allcat,updateProd,deltProd} = require("../controllers/prodController.js")
const {authorization} = require("../authorization/authorization.js");
router.get("/",(req,res)=>{
    console.log("working");
    res.send("You are in routes");
})
router.post("/newProd",authorization,newProd);

router.get("/allProd",allProd);

router.get("/allCategories",allcat)

router.put("/updateProd/:_id",authorization,updateProd)

router.delete("/deltprod/:_id",authorization,deltProd);

router.post("/categories",categories);

router.post("/move_priority",move_priority)

router.get("/prods/:id",prod_page)


module.exports=router;