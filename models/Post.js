
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide some content.'],
        maxlength: [500, 'Content cannot be more than 500 characters'],
    },
    imageUrl: {
        type: String,
    },
    fileId: {
        type: String, // ImageKit file ID for potential deletion
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String], // e.g., ['#Sports', '#Academics']
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
