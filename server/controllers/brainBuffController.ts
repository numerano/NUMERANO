import { Request, Response } from 'express';
import BrainBuff, { IBrainBuff } from '../models/BrainBuff';
import { generateBrainBuffQuestion } from '../services/geminiService';
import { getWeekId } from '../utils/dateHelpers';

export const getCurrentBrainBuff = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentDate = new Date();

        let brainBuff: IBrainBuff | null = await BrainBuff.findOne({
            active: true,
            expiresAt: { $gt: currentDate }
        });

        if (!brainBuff) {
            console.log('No active BrainBuff found. Generating new one...');

            try {
                const generatedData = await generateBrainBuffQuestion('Medium');
                const weekId = getWeekId();
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);

                await BrainBuff.updateMany({ active: true }, { active: false });

                brainBuff = await BrainBuff.create({
                    weekId,
                    ...generatedData,
                    active: true,
                    expiresAt: nextWeek
                });
            } catch (genError) {
                console.error('Generation failed, looking for any fallback:', genError);
                brainBuff = await BrainBuff.findOne().sort({ createdAt: -1 });

                if (!brainBuff) {
                    res.status(503).json({
                        message: 'BrainBuff service unavailable and no cached questions.'
                    });
                    return;
                }
            }
        }

        res.json(brainBuff);
    } catch (error) {
        console.error('Error in getCurrentBrainBuff:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const forceGenerateBrainBuff = async (req: Request, res: Response): Promise<void> => {
    try {
        const generatedData = await generateBrainBuffQuestion('Medium');
        const weekId = getWeekId() + '-' + Date.now();

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        await BrainBuff.updateMany({ active: true }, { active: false });

        const brainBuff = await BrainBuff.create({
            weekId,
            ...generatedData,
            active: true,
            expiresAt: nextWeek
        });

        res.json(brainBuff);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
