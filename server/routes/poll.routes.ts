import { Express } from "express";
import pollController from "../controllers/poll.controller";

export default (app: Express) => {
    app.post("/api/polls", pollController.create);
    app.get("/api/polls", pollController.getBy);
    app.get("/api/polls/:id", pollController.getOne);
    app.put("/api/polls/:id", pollController.addVote);
    app.put("/api/polls", pollController.editPoll);
    app.delete("/api/polls/:id", pollController.deletePoll);
};
