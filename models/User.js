
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this user.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address for this user.'],
        unique: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'parent', 'new'],
        default: 'new',
    },
    class: {
        type: String,
        // Only required if role is student
    },
    section: {
        type: String,
        // Only required if role is student
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
