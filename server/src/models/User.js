// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  status: { type: String, default: 'Hey there! I am using WhatsApp' },
  last_seen: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
