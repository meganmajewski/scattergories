const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {cors: { origin: "http://localhost:3000", methods: ['GET', 'POST']}});

// post the category answer - save to some db
//  - save answer per user 
const getApiAndEmit = socket => {
  // # of answers per person - ex: 1/12 answered 
  const response = new Date();
  console.log('emit')
  //
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
let interval;
app.use(index);

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  // at end of interval return all answers for categories per user
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});