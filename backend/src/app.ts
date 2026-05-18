import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.get("/", (req, res) => {
  res.send("Smart Leads API is running 🚀");
});
app.get("/api", (req, res) => {
  res.json({ message: "API is running 🚀" });
});
export default app;
