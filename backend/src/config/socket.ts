import { Server } from "socket.io";
import http from "http";

let io: Server;

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manage-dashboard.netlify.app"
];

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User joined room user:${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
