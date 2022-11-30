import { Express, Request, Response } from "express";

const router = (app: Express) => {
    app.get("/api/test", (request: Request, response: Response) => {
        response.status(200).json({
            message: "Test successful!",
        });
    });
};

export default router;