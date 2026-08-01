import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true,
  optionsSuccessStatus:200,
})
);
app.use(express.json());

app.use("/api/users",userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});