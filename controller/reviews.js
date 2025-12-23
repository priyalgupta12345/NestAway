const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");

module.exports.createreview=async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  console.log(newReview);
  newReview.author=req.user._id;
  console.log(newReview);
  
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("Review added!");
  req.flash("success","New Review Created !!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyreview=async (req, res) => {
  const { id, reviewId } = req.params;

  // Find the review first
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // Check if current user is the author
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to delete this review!");
    return res.redirect(`/listings/${id}`);
  }

  // Remove review from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the review
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!!");
  res.redirect(`/listings/${id}`);
}