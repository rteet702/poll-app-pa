import express, { Express } from "express";
import dotenv from "dotenv";
import genericRouter from "./routes/generic.routes";
import { Server } from "socket.io";

// dotenv config
dotenv.config();

// basic declarations
const app: Express = express();
const port = process.env.PORT || 8000;

// route declarations
genericRouter(app);

// spin up server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

//socketio
const io = new Server({
    cors: {
        origin: ["http://localhost:3000", "https://pollgram.teets.dev:*"],
        methods: ["GET", "POST"],
        allowedHeaders: ["secure-header"],
    },
});

io.listen(server);

io.on("connection", (socket) => {
    console.log(`New socket connection: ${socket.id}.`);

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}.`);
    });
});
