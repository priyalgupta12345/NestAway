const mongoose = require("mongoose");
const Listing = require("./models/listing"); // path adjust kar le

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

async function addCategoryToOldListings() {
  try {
    const result = await Listing.updateMany(
       { title: { $in: ["Secluded Treehouse Getaway", "Eco-Friendly Treehouse Retreat"] } }, 
      { $addToSet: { category: { $each: ['Treehouse','Camping'
        ,'Amazing Views','Farms','Amazing Pools'
        ]} } }      
    );
    console.log("Updated listings:", result.modifiedCount);
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

addCategoryToOldListings();
