const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/api/generate-itinerary", async (req, res) => {
    const { location, days } = req.body;
    // console.log(location);
    // console.log(process.env.API_KEY);

    try {
        const prompt = `
        Generate a well-organized ${days}-day travel itinerary for ${location}. 
        - Include a brief description of each city or attraction.
        - Use proper indentation and spacing for readability.
        - Each day's activities should be listed as bullet points.
        - Ensure the descriptions are concise and informative. 
        Example format:
        Day 1:
        - Visit [Place]: [1-2 sentences about why it's notable].
        - Explore [Another Place]: [Brief description].
        Day 2:
        - ...
    `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        const itinerary = result.response.text() || "No itinerary generated.";  
        const formattedItinerary = itinerary
        .replace(/Day (\d+):/g, '<h3 class="text-lg font-semibold mt-4 mb-2">Day $1:</h3>') // Format Day headings
        .replace(/^- /gm, '<li class="ml-4 mb-2 list-disc">') 
        .replace(/\n/g, ''); 

        console.log(result.response.text());
        // console.log(res);
        return res.json({ formattedItinerary });
        console.log(itinerary);
        
    } catch (err) {
        console.error("Error generating itinerary:", err.message);
        res.status(500).json({ message: "Failed to generate itinerary" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
