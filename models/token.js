import mongoose from 'mongoose';
import User from './user';

const tokenSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },
});

export default mongoose.model('Token', tokenSchema);
