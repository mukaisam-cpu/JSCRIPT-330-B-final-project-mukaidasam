import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true }
});

export default mongoose.model('User', userSchema);
