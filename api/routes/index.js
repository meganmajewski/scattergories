const database = require('../db/database');
const express = require("express");
const router = express.Router();
const path = require("path");
const socketIo = require("socket.io");

router.get("/", (_, res) =>
  res.sendFile("web/build/index.html", { root: '.' })
)
router.get('/answers', async (_, res) => {
  try {
    const results = await database.getAllAnswers()
    res.send({response: {results}}).status(200);
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}) 
router.post('/answers', async (req, res) => {
  console.log(req.body)
  try {
    await database.addAnswers(req.body)
    res.send().status(200);
  }
  catch(e) {
    console.log(e);
  }
})
router.post('/users', async (req, res) => {
  try{
    database.addUsers(req.body)
    res.send().status(200)
  }
  catch(e) {
    console.log(e);
  }
})
router.get("/game", (_, res) => {
  res.send({ response: "I am alive" }).status(200);
});
module.exports = router;