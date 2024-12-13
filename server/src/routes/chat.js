// routes/chat.js
import express from 'express';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

const router = express.Router();

// Get all chats for a user
router.get('/chats/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.params.userId
    })
    .populate('participants', 'username profile_picture')
    .populate('last_message')
    .sort({ 'last_message.timestamp': -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get chat messages
router.get('/messages/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({
      chat_id: req.params.chatId
    })
    .populate('sender_id', 'username profile_picture')
    .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new chat
router.post('/chat', async (req, res) => {
  try {
    const newChat = new Chat({
      participants: req.body.participants,
      chat_type: req.body.chat_type,
      group_name: req.body.group_name,
      group_admin: req.body.group_admin
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
