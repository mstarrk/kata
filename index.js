const express = require("express");
const app = express();
let port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("/aa.html");
});

app.listen(port, () => {
  console.log("Listening.");
});
