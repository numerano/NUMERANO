const mongoose = require('mongoose');

const BrainBuffSchema = new mongoose.Schema({
    weekId: {
        type: String, // e.g., "2026-W07"
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Number Theory', 'Geometry', 'Logic', 'Probability', 'Mixed']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        id: { type: String, required: true }, // A, B, C, D
        text: { type: String, required: true }
    }],
    correctAnswer: {
        type: String,
        required: true, // A, B, C, or D
        uppercase: true
    },
    explanation: {
        type: String,
        required: true
    },
    hint: {
        type: String
    },
    timeLimit: {
        type: Number,
        default: 300 // Seconds (5 minutes)
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('BrainBuff', BrainBuffSchema);
