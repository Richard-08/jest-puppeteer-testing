const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/html-report/report.html"));
});

app.listen(PORT, () => {
  console.log("Server has been started...");
});
