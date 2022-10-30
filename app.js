const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;


// Morgan
app.use(morgan("dev"));
// Set templanting engine to ejs
app.set("view engine", "ejs");
// Set static folder
app.use(express.static("public"));
// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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
    res.send(req.body);
});

// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});