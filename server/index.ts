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
  console.log("User connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on("sendMessage", (data: any) => {
    console.log(data);
    socket.to(data.room).emit("receiveMessage", data.message);
  });

  socket.on("joinRoom", (data: string) => {
    socket.join(data);
    console.log(`One user has join room ${data}`);
  });
});

httpServer.listen(8080, () => {
  console.log("App running on 8080");
});
