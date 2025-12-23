require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");

// DB & Models
const Listing = require("./models/listing");
const User = require("./models/user");

// PASSPORT
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ROUTES
const listingRoutes = require("./routes/listing");
const reviewsRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");

// UTILS
const wrapAsync = require("./utilis/wrapAsync");
const ExpressError = require("./utilis/ExpressError");

// --- Mongoose Connect ---
mongoose.connect(process.env.ATLASDB)
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.log("❌ DB Error:", err));

// --- SESSION STORE ---
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB, 
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600 // seconds
});

store.on("error", function(e){
  console.log("Session Store Error!", e);
});

// --- SESSION OPTIONS ---
const sessionOptions = {
  store,
  name: "session", // optional, hides default "connect.sid"
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
};

app.use(session(sessionOptions));
app.use(flash());

// --- VIEW SETUP ---
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- MIDDLEWARE ---
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// --- PASSPORT ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- FLASH & GLOBAL VARS ---
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// --- ROUTES ---
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewsRoutes);
app.use("/", userRoutes);

// --- DEMO USER ---
app.get("/demouser", async (req, res) => {
  let fakeuser = new User({
    email: "student@gmail.com",
    username: "priyal"
  });
  const registeredUser = await User.register(fakeuser, "helloworld");
  res.send(registeredUser);
});

// --- 404 & ERROR HANDLER ---
app.use((req, res) => {
  res.status(404).render("error.ejs", { message: "Page not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

// --- SERVER ---
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
