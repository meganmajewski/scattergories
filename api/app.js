// import database from "./db/database";
const database = require('./db/database');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const bodyParser = require('body-parser');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
     origin: "*", 
     methods: ['GET', 'POST']
  }});

let letter = "";

// post the category answer - save to some db
//  - save answer per user 
// const getApiAndEmit = socket => {
//   const newLetter = database.getLetter();
//   if(newLetter !== letter) {
//     socket.emit('FromAPI', letter)
//     letter = newLetter;
//   }
// };
// let interval;
const path = require("path");
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "build/")))
app.use(index);

server.listen(port, () => console.log(`Listening on port ${port}`));

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   // at end of interval return all answers for categories per user
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });
