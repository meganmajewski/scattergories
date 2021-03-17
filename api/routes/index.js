const database = require('../db/database');
const express = require("express");
const router = express.Router();
const path = require("path");
const socketIo = require("socket.io");

router.get("/", (_, res) =>
  res.sendFile(path.join('app/web', "build", "index.html"))
)
router.get('/answers', async (_, res) => {
  try {
    const results = await database.getAllAnswers()
    res.send({response: {results}}).status(200);
  } catch (e) {
    console.log(e)
  }
}) 
router.post('/answers', async (req, res) => {
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