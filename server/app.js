// app.js
import express from "express";
import http from "http";
import { Server } from "socket.io"; // Correct import for socket.io
// import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import Message from "./src/models/Message.js";
// import Chat from "./src/models/Chat.js";
// import User from "./src/models/User.js";
// import Notification from "./src/models/Notification.js";

dotenv.config();

// Create an Express app
const app = express();

// Create an HTTP server to work with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (the front-end) from the "public" folder
// app.use(express.static("public"));

// Listen for client connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle chat messages
  socket.on("message", async (messageData) => {
    const enhancedData = {
      text: messageData,
      senderId: socket.id,
    };
    io.emit("receiveMessage", enhancedData);
  });
  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
