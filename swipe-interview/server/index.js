import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// Generate one question
app.post("/api/generate-question", async (req, res) => {
  const { difficulty } = req.body;

  try {
    const prompt = `Generate ONE ${difficulty}-level interview question about React.js (not multiple choice, just open-ended). Keep it short and clear.`;
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const question = response.data.choices[0].message.content;
    res.json({ question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

// Submit answers and get score
app.post("/api/submit-answers", async (req, res) => {
  const { history } = req.body; // [{question, answer, difficulty}]

  try {
    const prompt = `
You are an interviewer for a React developer role.
Here are the questions and candidate's answers:

${history.map((h, i) => `Q${i + 1} (${h.difficulty}): ${h.question}\nA${i + 1}: ${h.answer}`).join("\n\n")}

Evaluate the candidate strictly on React knowledge:
- Assign a score out of 100
- Write a 3-4 sentence feedback summary
Return JSON with keys "score" and "feedback".
`;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.data.choices[0].message.content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to evaluate answers" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 4000}`);
});
