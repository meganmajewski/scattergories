const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build/")))
  .get("/", (_, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
