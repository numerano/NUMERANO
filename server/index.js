const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const feedbackRoutes = require('./routes/feedbackRoutes');
const brainBuffRoutes = require('./routes/brainBuffRoutes');
const initScheduler = require('./cron/scheduler');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/brainbuff', brainBuffRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Error Handler
app.use(errorHandler);

// Initialize Cron Jobs
initScheduler();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
