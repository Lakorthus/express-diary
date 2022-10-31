const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override')
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
// Method override middleware
app.use(methodOverride('_method'))  // override with POST having ?_method=DELETE/PATCH/PUT
// Import diary Model
const Diary = require("./models/Diary");
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
  Diary.find()
    .then((data) => {
      res.render("diary", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Route for adding records to diary
app.get("/add", (req, res) => {
  res.render("add");
});

// Route for Saving records to diary
app.post("/add-to-diary", (req, res) => {
  // Save data to database
  const Data = new Diary({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  });
  Data.save()
    .then(() => {
      res.redirect("/diary");
    })
    .catch((err) => console.log(err));
});
// Route fo /diary/:id for displaying single page using findOne
app.get("/diary/:id", (req, res) => {
  Diary.findOne({ _id: req.params.id })
    .then((data) => {
      res.render("page", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Route for /diary/edit/:id for editing single page using findOne
app.get("/diary/edit/:id", (req, res) => {
  Diary.findOne({ _id: req.params.id })
    .then((data) => {
      res.render("edit", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Edit Data
app.patch("/diary/edit/:id", (req, res) => {
  Diary.findOne({ _id: req.params.id })
    .then((data) => {
      data.title = req.body.title;
      data.description = req.body.description;
      data.date = req.body.date;
      data
        .save()
        .then(() => {
          res.redirect("/diary");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
