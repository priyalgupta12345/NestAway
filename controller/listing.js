const Listing=require("../models/listing");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("all.ejs", { allListings });
};

module.exports.renderlisting=(req, res) => {
  res.render("new.ejs");
};

module.exports.newListing=async (req, res) => {
    let category=req.body.listing.category;
    let url=req.file.path;
    let filename=req.file.filename;
    let location =req.body.listing.location;
    const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
  );
    const data = await response.json();
    if (data.length === 0) {
    req.flash("error", "location not found!");
    return;
  }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    req.body.listing.geometry={type:"Point",coordinates:[lon,lat]};
    console.log(url ,"...",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
    newListing.category=category;
    await newListing.save(); 

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.editlisting=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }

    // OWNER PERMISSION
    if (listing.owner.toString() !== req.user._id.toString()) {
      req.flash("error", "You do not have permission to edit this listing");
      return res.redirect(`/listings/${id}`);
    }

    res.render("edit.ejs", { listing });
  };
  // GET /listings
module.exports.index = async (req, res) => {
  const categoryFilter = req.query.category; // ?category=Camping
  const searchTerm = req.query.q;
  let allListings;
  let query = {};
  if (categoryFilter) {
    allListings = await Listing.find({
      category: { $in: [categoryFilter] } // works if category is an array
    });
  } else {
    allListings = await Listing.find({});
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: 'i' }; // case-insensitive search
  }
  allListings = await Listing.find(query);


  // send both listings and currently selected category to EJS
  res.render("all.ejs", { allListings, categoryFilter });
};


  module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (listing.owner.toString() !== req.user._id.toString()) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/listings/${id}`);
  }

  listing.set(req.body.listing);
  let location = req.body.listing.location;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
  );
    const data = await response.json();
    if (data.length === 0) {
    req.flash("error", "location not found!");
    return;
  }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    req.body.listing.geometry={type:"Point",coordinates:[lon,lat]};
    if (req.body.listing.category) {
      listing.category = req.body.listing.category; // overwrite with selected checkboxes
    } else {
      listing.category = []; // agar kuch select nahi hua to empty array
    }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};


module.exports.delete=async (req, res) => {
    let { id } = req.params;
    
    const listing = await Listing.findById(id);
    
    if (!listing) {
          req.flash("error", "Listing does not exist");
          return res.redirect("/listings");
    }
    
    // OWNER CHECK
    if (listing.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You do not have permission to delete this listing");
        return res.redirect(`/listings/${id}`);
    }
    
    await Listing.findByIdAndDelete(id);
    
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}

module.exports.listing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path:"reviews",populate:{path:"author"}})
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    res.render("show.ejs", {listing})
}