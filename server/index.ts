import express, { Express } from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import pollRoutes from "./routes/poll.routes";
const cors = require("cors");

// dotenv config
dotenv.config();

// basic declarations
const app: Express = express();
const port = process.env.PORT || 8000;

// basic configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://pollgram.teets.dev"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// route declarations
pollRoutes(app);

// spin up server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

// socketio
const io = new Server({
    cors: {
        origin: ["http://localhost:3000", "https://pollgram.teets.dev"],
        methods: ["GET", "POST"],
        allowedHeaders: ["secure-header"],
    },
});

io.listen(server);

io.on("connection", (socket) => {
    console.log(`[Socket.IO]: New socket connection: ${socket.id}.`);

    socket.emit("refetch-poll");

    socket.on("new-poll", () => {
        io.emit("refetch-poll");
    });

    socket.on("disconnect", () => {
        console.log(`[Socket.IO]: Socket disconnected: ${socket.id}.`);
    });
});
