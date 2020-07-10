const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  return res.json({ message: "Oi" });
});

io.on("connection", (socket) => {
  console.log("Um usuário se conectou");
  socket.on("disconnect", (socket) => {
    console.log("Um usuário saiu");
  });

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

http.listen(3333);
