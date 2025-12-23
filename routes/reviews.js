const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utilis/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const {reviewSchema}=require("../schema.js")
const Listing = require("../models/listing.js");
const ExpressError = require("../utilis/ExpressError.js");
const Review = require("../models/reviews.js");
const { isloggedin , isreviewauthor } = require("../middleware.js");
const reviewcontroller=require("../controller/reviews.js");

// VALIDATE REVIEW SCHEMA
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errormsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errormsg);
  }
  next();
};
router.post("/",isloggedin, validateReview, wrapAsync(reviewcontroller.createreview));

router.delete("/:reviewId", isloggedin,isreviewauthor,validateReview, wrapAsync(reviewcontroller.destroyreview));

module.exports=router;