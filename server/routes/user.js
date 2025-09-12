const express = require("express")
const {loginUser,logout,RegisterUser}=require("../controller/user")
const userAuthVerification= require("../middleware/index")

const route = express.Router()

route.post("/register",RegisterUser)
route.post("/login",loginUser)
route.post("/logout",logout);
route.post("/auth",userAuthVerification)

module.exports=route