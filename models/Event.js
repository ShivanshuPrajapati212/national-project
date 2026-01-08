
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an event title.'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date.'],
    },
    type: {
        type: String,
        enum: ['exam', 'holiday', 'event'],
        default: 'event',
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
