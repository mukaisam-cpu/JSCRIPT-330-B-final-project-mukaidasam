import mongoose from "mongoose";
import User from './user';

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
    },
    name: {type: String, required: true},
    games: {type: Array, required: false}
});

playlistSchema.index({ name: 'text'});

export default mongoose.model('Playlist', playlistSchema);