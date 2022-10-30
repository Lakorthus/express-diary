const express = require('express');
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
// Routing

// Route for /
app.get("/", (req, res) => {
    res.send("<h1>Express Diary</h1>");
});
// Route for /about
app.get("/about", (req, res) => {
    res.send("<h1>About Express Diary</h1>");
});

// Create server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});