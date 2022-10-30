const express = require('express');
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

// Set templanting engine to ejs
app.set("view engine", "ejs");

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

// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});