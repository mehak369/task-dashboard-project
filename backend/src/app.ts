import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manage-dashboard.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);


app.use(express.json());        
app.use(cookieParser());

import authRoutes from "./routes/auth.routes";
app.use("/api/auth", authRoutes);
import taskRoutes from "./routes/task.routes";

app.use("/api/tasks", taskRoutes);

export default app;
