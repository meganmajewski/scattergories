const database = require('../db/database');
const express = require("express");
const router = express.Router();
const path = require("path");
const socketIo = require("socket.io");

// express.use(express.static(path.join(__dirname, "build/")))
router.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
)
router.get('/answers', async (_, res) => {
  try {
    const results = await database.getAllAnswers()
    console.log(results);
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
router.post('/letter',(req, res)=> {
  database.addLetter(req.body)
})
router.get("/game", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
module.exports = router;