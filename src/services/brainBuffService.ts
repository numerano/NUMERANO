const API_URL = 'http://localhost:8000/api/brainbuff';

export const getCurrentBrainBuff = async () => {
    try {
        const response = await fetch(`${API_URL}/current`);
        if (!response.ok) {
            throw new Error('Failed to fetch BrainBuff');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching BrainBuff:', error);
        throw error;
    }
};
