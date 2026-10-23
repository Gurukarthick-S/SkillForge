import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import mentorRoutes from "./routes/mentor.routes.js";
import jobRoutes from "./routes/jobRoutes.js";
import atsRoutes from "./routes/ats.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ats", atsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
