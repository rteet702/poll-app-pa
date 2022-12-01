import { Express } from "express";
import pollController from "../controllers/poll.controller";

export default (app: Express) => {
    app.post("/api/polls", pollController.create);
};
