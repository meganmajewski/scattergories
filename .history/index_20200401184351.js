const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

firebase.initializeApp(firebaseutils.config());

express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build/")))
  .get("/allImages", async (_, res) => {
    try {
      const results = await databaseutils.allImages(pool);
      if (results) {
        res.json(results);
      } else {
        throw "no results";
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      res.send("Error" + err);
    }
  })
  .post("/uploadImage", upload().single("image"), async (req, res) => {
    try {
      const url = await firebaseutils.uploadToFirebase(req.file, firebase);
      if (url) {
        try {
          await databaseutils.uploadToDb(url, req.body.cdsid, pool);
        } catch (e) {
          throw ("error uploading to database, ", e);
        }
        res.send("Image uploaded");
      } else {
        throw "image url is undefined, cannot upload to database";
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send("Failure");
    }
  })
  .get("/currentImage", async (_, res) => {
    try {
      const results = await databaseutils.getCurrentImage(pool);
      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.send("Error" + err);
    }
  })
  .post("/vote", textParser, async (req, res) => {
    try {
      await databaseutils.vote(pool, req.body);
      res.send("voted");
    } catch (e) {
      console.log("error", e);
    }
  })
  .get("/topVotes", async (_, res) => {
    try {
      const results = await databaseutils.topVotes(pool);
      res.json(results);
    } catch (error) {
      console.log(err);
      res.status(500);
      res.send(error);
    }
  })
  .get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .get("/", (_, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
