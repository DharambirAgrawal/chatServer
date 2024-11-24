// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";  // Correct import for socket.io

// Create an Express app
const app = express();

// Create an HTTP server to work with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server);


// Serve static files (the front-end) from the "public" folder
app.use(express.static("public"));

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for "chat message" events from clients
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);

    // Emit the message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
