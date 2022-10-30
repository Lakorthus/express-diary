const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

// Connect to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Morgan
app.use(morgan("dev"));
// Set templanting engine to ejs
app.set("view engine", "ejs");
// Set static folder
app.use(express.static("public"));
// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Import diary Model
const Diary = require("./models/diary");

// ROUTING
// Route for /
app.get("/", (req, res) => {
  // res.render("home",{value: "Express Diary"});
  res.render("home");
});
// Route for /about
app.get("/about", (req, res) => {
  res.render("about");
});
// Route for /diary
app.get("/diary", (req, res) => {
  res.render("diary");
});
// Route for adding records to diary
app.get("/add", (req, res) => {
  res.render("add");
});

// Route for Saving records to diary
app.post("/add-to-diary", (req, res) => {
  res.send(req.body.title);
});

// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
