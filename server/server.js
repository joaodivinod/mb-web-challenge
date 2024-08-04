const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Define routes
app.use("/", routes);

// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
