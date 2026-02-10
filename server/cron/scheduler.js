const cron = require('node-cron');
const BrainBuff = require('../models/BrainBuff');
const { generateBrainBuffQuestion } = require('../services/geminiService');

const initScheduler = () => {
    // Run every Monday at 00:00
    cron.schedule('0 0 * * 1', async () => {
        console.log('Running weekly BrainBuff rotation...');

        try {
            // Deactivate all
            await BrainBuff.updateMany({ active: true }, { active: false });

            // Generate new
            const generatedData = await generateBrainBuffQuestion('Medium');

            const now = new Date();
            const weekId = `${now.getFullYear()}-W${getWeekNumber(now)}`;

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
            // Retry logic could go here
        }
    });
};

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

module.exports = initScheduler;
