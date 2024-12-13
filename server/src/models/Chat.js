import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chat_type: { type: String, enum: ['individual', 'group'], required: true },
  group_name: { type: String }, // Only for group chats
  group_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Only for group chats
  last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
