import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./config/socket";

const PORT = process.env.PORT || 5050;

const server = http.createServer(app);

connectDB();

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
