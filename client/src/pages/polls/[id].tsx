import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import VoteButtonCyan from "../../components/VoteButtonCyan";
import VoteButtonPurple from "../../components/VoteButtonPurple";

type Poll = {
    id: string;
    question: string;
    firstOption: string;
    firstVotes: string[];
    secondOption: string;
    secondVotes: string[];
    createdAt: Date;
    updatedAt: Date;
};

interface Props {
    ip: string;
}

const fetchById = async (id: string | string[]) => {
    const poll = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`
    );
    return poll.data.poll;
};

const DynamicPollPage: NextPage<Props> = ({ ip }) => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState<Poll>();
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        if (!id) return;
        const server = process.env.NEXT_PUBLIC_SERVER_URL;

        if (!server) return;
        const socket = io(server, {
            extraHeaders: {
                "secure-header": "true",
            },
        });

        setSocket(socket);

        socket.on("refetch-poll", () => {
            fetchById(id)
                .then((poll) => {
                    setPollData(poll);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        return () => {
            socket.close();
        };
    }, [id]);

    const handleVote = async (option: number) => {
        const result = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`,
            { option }
        );
        if (socket) {
            socket.emit("new-poll");
        }
    };

    if (!pollData) return <div>Loading...</div>;

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-6xl text-center">{pollData.question}</h1>

                {pollData.firstVotes.includes(ip) ||
                pollData.secondVotes.includes(ip) ? (
                    <div className="h-[300px] pt-10 text-4xl text-center">
                        <h2>Thanks for voting!</h2>

                        <div className="py-10" />

                        <div>
                            <h2 className="text-4xl text-center">
                                Current Standing
                            </h2>

                            <div className="py-10" />
                            {pollData.firstVotes.length >
                            pollData.secondVotes.length ? (
                                <ProgressBar
                                    completed={pollData.firstVotes.length}
                                    maxCompleted={
                                        pollData.firstVotes.length +
                                        pollData.secondVotes.length
                                    }
                                    borderRadius="none"
                                    bgColor="cyan"
                                    baseBgColor="purple"
                                    height="3rem"
                                    labelAlignment="center"
                                    customLabel={`${pollData.firstOption} | ${
                                        pollData.firstVotes.length /
                                        (pollData.firstVotes.length +
                                            pollData.secondVotes.length)
                                    }`}
                                />
                            ) : (
                                <ProgressBar
                                    completed={pollData.secondVotes.length}
                                    maxCompleted={
                                        pollData.firstVotes.length +
                                        pollData.secondVotes.length
                                    }
                                    borderRadius="none"
                                    bgColor="purple"
                                    baseBgColor="cyan"
                                    height="3rem"
                                    labelAlignment="center"
                                    customLabel={`${pollData.secondOption} | ${
                                        (pollData.secondVotes.length /
                                            (pollData.firstVotes.length +
                                                pollData.secondVotes.length)) *
                                        100
                                    }%`}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-10 h-[300px] pt-10">
                        <VoteButtonCyan
                            text={pollData.firstOption}
                            onClick={() => handleVote(0)}
                        />
                        <VoteButtonPurple
                            text={pollData.secondOption}
                            onClick={() => handleVote(1)}
                        />
                    </div>
                )}

                <div className="py-10" />
            </div>
        </div>
    );
};

export default DynamicPollPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
    let ip;

    const { req } = context;

    if (req.headers["x-forwarded-for"]) {
        ip = (req.headers["x-forwarded-for"] as string).split(",")[0];
    } else if (req.headers["x-real-ip"]) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.connection.remoteAddress;
    }

    console.log(ip);
    return {
        props: {
            ip,
        },
    };
};
