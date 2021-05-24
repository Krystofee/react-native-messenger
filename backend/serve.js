const port = 3000;

const express = require("express");
const app = express();
const httpServer = require("http").createServer();
const options = {
  cors: false,
  // origins: ["http://127.0.0.1:5347"],
};
const io = require("socket.io")(httpServer, options);

// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

io.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

httpServer.listen(port);
