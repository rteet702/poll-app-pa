import { Express } from "express";
import pollController from "../controllers/poll.controller";

export default (app: Express) => {
    app.post("/api/polls", pollController.create);
    app.get("/api/polls/:id", pollController.getOne);
    app.put("/api/polls/:id", pollController.addVote);
};
