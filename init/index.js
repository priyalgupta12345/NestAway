//inserts data into the database

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initdb = async () => {
  await Listing.deleteMany({});
  initdata.data=initdata.data.map((obj)=>({...obj,owner:"69282c4ac79e2f9e27f1ba5e"}))
  await Listing.insertMany(initdata.data); // or just initdata, depending on export
  console.log("Data was initialised");
};

main()
  .then(async () => {
    console.log("Connected to DB");
    await initdb();
  })
  .catch((err) => {
    console.log(err);
  });
