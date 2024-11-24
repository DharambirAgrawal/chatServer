// models/Media.js
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  file_type: { 
    type: String,
    enum: ['image', 'video', 'audio'],
    required: true 
  },
  file_url: { type: String, required: true },
  size: { type: Number, required: true },
  uploaded_at: { type: Date, default: Date.now },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Media', mediaSchema);
