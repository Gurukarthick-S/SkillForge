
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export const chatWithMentor = async (req, res) => {
  try {
    if (!groq) {
      return res.status(500).json({
        message: "API key is missing. Check server/.env.",
      });
    }

    const { message, history = [] } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a question.",
      });
    }

    const validHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              ["user", "model", "assistant"].includes(item.role) &&
              typeof item.text === "string" &&
              item.text.trim()
          )
          .slice(-10)
          .map((item) => ({
            role: item.role === "model" ? "assistant" : item.role,
            content: item.text.slice(0, 4000),
          }))
      : [];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `You are SkillForge AI Mentor, a concise programming tutor and career guide.
Explain concepts in simple language.
Give a short answer first.
Use small code examples when useful.
Help with JavaScript, Python, Java, MERN, DSA, and careers.
Give detailed explanations when requested.`,
        },
        ...validHistory,
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_completion_tokens: 512,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply || typeof reply !== "string") {
      return res.status(502).json({
        message: "AI mentor returned an empty response. Please try again.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI Mentor error:", error.status, error.message);

    return res.status(502).json({
      message: "The AI Mentor could not respond. Please try again.",
    });
  }
};
