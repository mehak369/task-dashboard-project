import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.set("trust proxy", 1);


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

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
