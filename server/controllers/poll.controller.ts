import { prisma } from "../prisma/client";
import { Response, Request } from "express";

export default {
    create: async (request: Request, response: Response) => {
        const { question, firstOption, secondOption } = request.body;

        const newPoll = await prisma.polls.create({
            data: {
                question,
                firstOption,
                secondOption,
            },
        });

        response.status(201).json({
            poll: newPoll,
        });
    },
    getOne: async (request: Request, response: Response) => {
        const { id } = request.params;
        const poll = await prisma.polls.findFirst({ where: { id: id } });
        if (!poll) {
            return response.status(404).json({ error: "No poll found." });
        }
        response.status(200).json({ poll });
    },
    addVote: async (request: Request, response: Response) => {
        const { option } = request.body;
        const { id } = request.params;
        let update;
        // first option
        if (option === 0) {
            update = await prisma.polls.update({
                where: { id: id },
                data: {
                    firstVotes: {
                        push: request.ip,
                    },
                },
            });
        }
        // second option
        else {
            update = await prisma.polls.update({
                where: { id: id },
                data: {
                    secondVotes: {
                        push: request.ip,
                    },
                },
            });
        }
        response.status(201).json({ message: "Success voting.", poll: update });
    },
};
