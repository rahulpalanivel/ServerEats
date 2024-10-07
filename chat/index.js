const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(3030, () => {
  console.log("Server is running");
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello ",
  });
});
