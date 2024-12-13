// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Listen for "chat message" events from clients
//   socket.on("chat message", (msg) => {
//     console.log("Message received:", msg);

//     // Emit the message to all connected clients
//     io.emit("chat message", msg);
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

