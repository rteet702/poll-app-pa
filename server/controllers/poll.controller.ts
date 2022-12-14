import { prisma } from "../prisma/client";
import { Response, Request } from "express";

export default {
    create: async (request: Request, response: Response) => {
        const { question, firstOption, secondOption, ip, expiresAfter } =
            request.body;
        let expiresAt;

        if (expiresAfter && expiresAfter > 0) {
            expiresAt = new Date(new Date().valueOf() + expiresAfter * 60000);
        }

        console.log(expiresAt);

        const newPoll = await prisma.polls.create({
            data: {
                question,
                firstOption,
                secondOption,
                author: [ip],
                expiresAt,
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
    getBy: async (request: Request, response: Response) => {
        const { ip } = request.body;
        if (!ip) {
            const polls = await prisma.polls.findMany({});
            return response.status(200).json({ polls });
        }

        const polls = await prisma.polls.findMany({
            where: {
                author: {
                    hasSome: [ip],
                },
            },
        });
        if (!polls) {
            return response.status(404).json({ error: "No polls found." });
        }
        response.status(200).json({ polls });
    },
    addVote: async (request: Request, response: Response) => {
        const { option, ip } = request.body;
        const { id } = request.params;
        let update;
        // first option
        if (option === 0) {
            update = await prisma.polls.update({
                where: { id: id },
                data: {
                    firstVotes: {
                        push: ip,
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
                        push: ip,
                    },
                },
            });
        }
        response.status(201).json({ message: "Success voting.", poll: update });
    },
    deletePoll: async (request: Request, response: Response) => {
        const { id } = request.params;
        await prisma.polls.delete({
            where: {
                id: id,
            },
        });
        response
            .status(200)
            .json({ message: "Successfully removed poll from db." });
    },
    editPoll: async (request: Request, response: Response) => {
        const { question, firstOption, secondOption, ip, expiresAfter, id } =
            request.body;
        let expiresAt;

        if (expiresAfter) {
            expiresAt = new Date(new Date().valueOf() + expiresAfter * 60000);
        }

        const edit = await prisma.polls.update({
            where: {
                id: id,
            },
            data: {
                question,
                firstOption,
                secondOption,
                author: [ip],
                expiresAt,
            },
        });

        response.status(200).json({ edit });
    },
};
