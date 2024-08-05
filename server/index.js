const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/js", express.static(path.join(__dirname, "../src/main.js")));

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get(/^((?!\/api).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
