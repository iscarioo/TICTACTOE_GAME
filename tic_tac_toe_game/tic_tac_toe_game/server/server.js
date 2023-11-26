const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("joinPlayer", (playerName) => {
    console.log(`A user joined the room ${playerName}`);
    socket.join(playerName);
  });

  socket.on("play", ({ id, playerName }) => {
    console.log(`play at ${id} to ${playerName}`);
    socket.broadcast.to(playerName).emit("updateGame", id);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(3000, () =>
  console.log("server running => http://localhost:3000")
);