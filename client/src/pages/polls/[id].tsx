import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import VoteButtonCyan from "../../components/VoteButtonCyan";
import VoteButtonPurple from "../../components/VoteButtonPurple";
import Link from "next/link";
import VoteBar from "../../components/VoteBar";

type Poll = {
    id: string;
    question: string;
    firstOption: string;
    firstVotes: string[];
    secondOption: string;
    secondVotes: string[];
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
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
            { option, ip }
        );
        if (socket) {
            socket.emit("new-poll");
        }
    };

    if (!pollData)
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );

    if (pollData.expiresAt < new Date()) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                    <Link className="float-right" href="/">
                        Home
                    </Link>
                    <h1 className="text-6xl text-center">
                        {pollData.question}
                    </h1>

                    <div className="py-10" />

                    <h2 className="text-center text-4xl">Poll Expired!</h2>

                    <div className="py-10" />

                    <div>
                        <h2 className="text-4xl text-center">Results</h2>

                        <div className="py-5" />

                        <div className="flex items-center justify-between w-2/4 mx-auto">
                            <p>{pollData.firstOption}</p>
                            <p>{pollData.firstVotes.length}</p>
                        </div>
                        <div className="flex items-center justify-between w-2/4 mx-auto">
                            <p>{pollData.secondOption}</p>
                            <p>{pollData.secondVotes.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <Link className="float-right" href="/">
                    Home
                </Link>
                <h1 className="text-6xl text-center">{pollData.question}</h1>

                {pollData.firstVotes.includes(ip) ||
                pollData.secondVotes.includes(ip) ? (
                    <div className="h-[300px] pt-10 text-4xl text-center">
                        <h2>Thanks for voting!</h2>

                        <div className="py-10" />
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

                <div>
                    <h2 className="text-4xl text-center">Current Standing</h2>

                    <div className="py-10" />

                    <VoteBar
                        options={[pollData.firstOption, pollData.secondOption]}
                        votes={[
                            pollData.firstVotes.length,
                            pollData.secondVotes.length,
                        ]}
                    />
                </div>
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
