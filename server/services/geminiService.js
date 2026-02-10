const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

const generateBrainBuffQuestion = async (difficulty = 'Medium') => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const prompt = `
You are an expert mathematician and puzzle designer.

Generate ONE original BrainBuff question with the following constraints:

- Domain: Mathematics / Logical Reasoning
- Difficulty: ${difficulty}
- Category: Mixed (Number Theory, Geometry, Logic, or Probability)
- Question must be conceptual, non-Googleable, and solvable without calculators.
- Avoid trivial or repetitive patterns.

Return the response in this JSON structure:

{
  "title": "A creative title",
  "category": "Number Theory | Geometry | Logic | Probability | Mixed",
  "difficulty": "Easy | Medium | Hard",
  "question": "The question text",
  "options": [
    { "id": "A", "text": "Option A" },
    { "id": "B", "text": "Option B" },
    { "id": "C", "text": "Option C" },
    { "id": "D", "text": "Option D" }
  ],
  "correctAnswer": "A",
  "hint": "A subtle hint",
  "explanation": "Short but insightful explanation"
}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        try {
            const data = JSON.parse(text);

            // Basic validation
            if (!data.question || !data.options || !data.correctAnswer) {
                console.error('Invalid structure:', data);
                throw new Error('Invalid JSON structure from Gemini');
            }

            return data;
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', text);
            throw new Error('Failed to parse Gemini response');
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};

module.exports = { generateBrainBuffQuestion };
