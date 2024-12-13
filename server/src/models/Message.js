// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message_type: { 
    type: String, 
    enum: ['text', 'image', 'video', 'audio', 'file'],
    required: true 
  },
  content: { type: String, required: true },
  media_url: { type: String },
  status: { 
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  edited: { type: Boolean, default: false },
  replied_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
