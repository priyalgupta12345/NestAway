import mongoose from "mongoose"; // use import if using ESM
import Listing from "./models/listing.js"; // adjust path
// Node 18+ has built-in fetch

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

async function getCoordinates(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (err) {
    console.log("Error fetching coordinates:", err);
    return null;
  }
}

async function updateListings() {
  // Catch missing, null, or empty geometry
  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { geometry: null },
      { geometry: {} }
    ]
  });

  console.log(`Found ${listings.length} listings missing geometry`);

  for (const listing of listings) {
    console.log(`Processing listing: ${listing._id} (${listing.title})`);

    const coords = await getCoordinates(listing.location);
    if (!coords) {
      console.log(`  ❌ Could not fetch coordinates for: ${listing.location}`);
      continue;
    }

    listing.geometry = { type: "Point", coordinates: [coords.lon, coords.lat] };
    await listing.save();
    console.log(`  ✅ Updated geometry: [${coords.lon}, ${coords.lat}]`);

    // Respect Nominatim rate limit
    await new Promise(res => setTimeout(res, 1100)); // wait 1.1 sec
  }

  console.log("All done!");
  mongoose.connection.close();
}

updateListings();
