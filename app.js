const express = require('express');
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

// Set templanting engine to ejs
app.set("view engine", "ejs");

// Set static folder
app.use(express.static("public"));

// Routing

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
// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});