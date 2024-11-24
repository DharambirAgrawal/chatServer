// app.js
import express from "express";
import http from "http";
import { Server } from "socket.io";  // Correct import for socket.io
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Message from './src/models/Message.js';
import Chat from './src/models/Chat.js';
import User from './src/models/User.js';
import Notification from './src/models/Notification.js';

dotenv.config();








// Create an Express app
const app = express();

// Create an HTTP server to work with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});



// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (the front-end) from the "public" folder
app.use(express.static("public"));

// Listen for client connections


// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a chat room
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat: ${chatId}`);
  });

  // Handle new message
  socket.on('send_message', async (messageData) => {
    try {
      const newMessage = new Message({
        chat_id: messageData.chat_id,
        sender_id: messageData.sender_id,
        message_type: messageData.message_type,
        content: messageData.content,
        media_url: messageData.media_url
      });

      await newMessage.save();

      // Update last message in chat
      await Chat.findByIdAndUpdate(messageData.chat_id, {
        last_message: newMessage._id
      });

      // Create notification for other participants
      const chat = await Chat.findById(messageData.chat_id);
      const otherParticipants = chat.participants.filter(
        p => p.toString() !== messageData.sender_id
      );

      // Create notifications for other participants
      const notifications = otherParticipants.map(participant => ({
        user_id: participant,
        type: 'message',
        content: 'New message received',
        link: `/chat/${messageData.chat_id}`
      }));

      await Notification.insertMany(notifications);

      // Broadcast message to room
      io.to(messageData.chat_id).emit('receive_message', newMessage);
      
      // Emit notifications to other participants
      otherParticipants.forEach(participant => {
        io.to(participant.toString()).emit('new_notification', {
          type: 'message',
          content: 'New message received'
        });
      });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Error sending message' });
    }
  });

  // Handle typing status
  socket.on('typing', (data) => {
    socket.to(data.chat_id).emit('user_typing', {
      user_id: data.user_id,
      typing: data.typing
    });
  });

  // Handle read status
  socket.on('mark_read', async (messageId) => {
    try {
      await Message.findByIdAndUpdate(messageId, { status: 'read' });
      io.to(messageId).emit('message_read', messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});




// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


  // Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
