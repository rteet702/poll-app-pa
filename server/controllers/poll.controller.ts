import { prisma } from "../prisma/client";
import { Response, Request } from "express";

export default {
    create: async (request: Request, response: Response) => {
        const { question } = request.body;
        const newPoll = await prisma.polls.create({
            data: {
                question: question,
            },
        });

        response.status(201).json({
            poll: newPoll,
        });
    },
};
