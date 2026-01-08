
import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a resource title.'],
    },
    description: {
        type: String,
    },
    subject: {
        type: String, // e.g., 'Mathematics', 'Science', 'English'
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileId: {
        type: String,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
