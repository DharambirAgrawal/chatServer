// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String,
    enum: ['message', 'friend_request', 'mention', 'other'],
    required: true 
  },
  content: { type: String, required: true },
  link: { type: String },
  read_status: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
