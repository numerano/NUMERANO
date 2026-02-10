const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the parent directory's .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    console.log("--- Testing Gemini Generation (gemini-2.5-flash) ---");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { console.error("Error: GEMINI_API_KEY is missing."); return; }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        console.log("Generating content...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log(`✅ SUCCESS! Response: ${response.text()}`);
        console.log("Model is functioning correctly.");
    } catch (error) {
        console.error("❌ GENERATION FAILED:", error.message);
    }
}

run();
