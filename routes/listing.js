const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isloggedin } = require("../middleware.js");
const ExpressError = require("../utilis/ExpressError.js");
const listingcontroller = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js"); // your cloudinary config
const upload = multer({ storage });

// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errormsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errormsg);
  } else {
    next();
  }
};

// NEW LISTING PAGE
router.get("/new", isloggedin, listingcontroller.renderlisting);

// LISTINGS ROUTES
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isloggedin,
    upload.single("listing[image][url]"), // ✅ multer handles file
    validateListing,
    wrapAsync(listingcontroller.newListing)
  );

// EDIT PAGE
router.get("/:id/edit", isloggedin, wrapAsync(listingcontroller.editlisting));

router
  .route("/:id")
  .put(isloggedin,upload.single("listing[image][url]"), wrapAsync(listingcontroller.updatelisting))
  .delete(isloggedin, wrapAsync(listingcontroller.delete))
  .get(wrapAsync(listingcontroller.listing));

module.exports = router;
