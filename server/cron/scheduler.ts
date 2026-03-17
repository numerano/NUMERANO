import cron from 'node-cron';
import BrainBuff from '../models/BrainBuff';
import { generateBrainBuffQuestion } from '../services/geminiService';
import { getWeekId } from '../utils/dateHelpers';

const initScheduler = (): void => {
    // Run every Monday at 00:00
    cron.schedule('0 0 * * 1', async () => {
        console.log('Running weekly BrainBuff rotation...');

        try {
            await BrainBuff.updateMany({ active: true }, { active: false });

            const generatedData = await generateBrainBuffQuestion('Medium');

            const now = new Date();
            const weekId = getWeekId(now);

            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);

            await BrainBuff.create({
                weekId,
                ...generatedData,
                active: true,
                expiresAt: nextWeek
            });

            console.log('Weekly BrainBuff rotated successfully.');
        } catch (error) {
            console.error('Weekly rotation failed:', error);
        }
    });
};

export default initScheduler;
