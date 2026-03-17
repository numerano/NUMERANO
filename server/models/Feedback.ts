import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
    name?: string;
    email?: string;
    description: string;
    createdAt: Date;
}

const feedbackSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IFeedback>('Feedback', feedbackSchema);
