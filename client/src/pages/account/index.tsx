import { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Props {
    ip: string;
}

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

const server = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchPolls = async (ip: string) => {
    const response = await axios.get(`${server}/api/polls`, { params: { ip } });
    return response.data.polls;
};

const AccountPage: NextPage<Props> = ({ ip }) => {
    const [polls, setPolls] = useState<Poll[]>();

    useEffect(() => {
        fetchPolls(ip)
            .then((polls) => setPolls(polls))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (
        e: React.MouseEvent<HTMLElement>,
        deletedPoll: Poll
    ) => {
        axios
            .delete(`${server}/api/polls/${deletedPoll.id}`)
            .then((response) => {
                setPolls((prev) =>
                    prev?.filter((poll) => {
                        if (deletedPoll.id === poll.id) {
                            return false;
                        }
                        return true;
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (!polls) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                    <h1 className="text-6xl mb-5">Your Polls</h1>
                    <p>No polls created... yet</p>
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
                <h1 className="text-6xl mb-5">Your Polls</h1>
                <p className="mb-5">
                    Click any question below to go to the poll.
                </p>

                <hr className="mb-5" />

                {polls.map((poll, index) => {
                    return (
                        <div className="flex justify-between" key={index}>
                            <Link href={`/polls/${poll.id}`}>
                                {poll.question}
                            </Link>
                            <div className="flex gap-5">
                                <Link href={`/edit/${poll.id}`}>Edit</Link>
                                <button onClick={(e) => handleDelete(e, poll)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AccountPage;
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
