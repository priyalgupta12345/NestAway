const express = require("express");
const app=express();
const router = express.Router();
const passport=require("passport");
const User=require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const {saveRedirectUrl}=require("../middleware.js");
const usercontroller=require("../controller/user.js");
// const { useReducer } = require("react");
router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
})
router.post("/signup", wrapAsync(usercontroller.signup));
router
    .route("/login")
    .get(usercontroller.renderloginform)
    .post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),usercontroller.login)

router.get("/logout",usercontroller.logout);

module.exports=router;