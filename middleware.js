const Listing = require("./models/listing");
const Review = require("./models/reviews");

module.exports.isloggedin=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
    req.flash("error","you need to login !!!");
    return res.redirect("/login");
  }
  next();
};
module.exports.isreviewauthor=async(req,res,next)=>{
  let {id ,reviewId}=req.params;
  let review=await Review.findById(reviewId);
  if(!review.author  .equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of the review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

