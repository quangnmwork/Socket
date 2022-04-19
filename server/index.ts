const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
import { Server } from "socket.io";
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data: any) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data: any) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log("App running on 8080");
});
