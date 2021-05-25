const port = 3000;

const express = require("express");
const app = express();
const httpServer = require("http").createServer();
const options = {
  cors: false,
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

httpServer.listen(port);
