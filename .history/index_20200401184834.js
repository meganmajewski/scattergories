const express = require("express");
const PORT = process.env.PORT || 5000;
const path = require("path");

express()
  .use(express.static(path.join(__dirname, "ui/build/")))
  .get("/", (_, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
