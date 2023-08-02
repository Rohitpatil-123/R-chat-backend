import express from "express";
const app = express();
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.js";
import chatrouter from "./routes/chat.js";
import e from "express";
// import { emit } from "process";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//using routes
app.use("/user", userrouter);
app.use(chatrouter);
export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("userid", (data) => {
    console.log(data);
  });
  socket.join(1);
  socket.on("message", (data) => {
    console.log("user id ", socket.id);
    console.log(data);
    io.to(1).emit("recmsg", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
