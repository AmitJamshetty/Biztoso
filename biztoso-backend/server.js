import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (room_id) => {
    socket.join(room_id);
    console.log(`User connected with ID: ${socket.id} joined room: ${room_id}`);
  });

  socket.on("send_message", (data) => {
    console.log(`Message sent to room ${data.room}:`, data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
  });
});

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));