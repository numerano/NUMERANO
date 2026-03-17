import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import feedbackRoutes from './routes/feedbackRoutes';
import brainBuffRoutes from './routes/brainBuffRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/brainbuff', brainBuffRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
