import { Request, Response } from 'express';
import Feedback, { IFeedback } from '../models/Feedback';

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
const createFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.description || !req.body.description.trim()) {
            res.status(400).json({ message: 'Description is required.' });
            return;
        }
        const newFeedback: IFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export { createFeedback };
