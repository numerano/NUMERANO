const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    relevance: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    participation: {
        type: String,
        required: true
    },
    nextTopic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    // New fields
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
