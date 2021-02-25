const express = require("express");
const router = express.Router();
const path = require("path");

// express.use(express.static(path.join(__dirname, "build/")))
router.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
)
router.get("/game", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
module.exports = router;