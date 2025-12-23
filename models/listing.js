const mongoose = require("mongoose");
const {Schema}=mongoose;
const  Review=require("./reviews.js"); 
const listingSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    country: String,
    image: {
        url: String,
        filename: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
         type:Schema.Types.ObjectId,
         ref:"User"
    },
    geometry:{
      type:{
         type:String,
         enum:['Point'],
         required:true
      },
      coordinates:{
        type:[Number],
        required:true
      },
      default:[]
    },
    category:{
      type:[String],
      enum:['Beach','Mountains','Iconic Cities','Lakefront','Arctic',
        'Farms','Camping','Surfing','Castle','Amazing Pools','Rooms','Amazing Views',
        'Tree Houses','Appartments','Tiny Homes'],
        required:true
    }

});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
