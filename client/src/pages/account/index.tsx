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

const fetchPolls = async (ip: string) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
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
                        <div className="" key={index}>
                            <Link href={`/polls/${poll.id}`}>
                                {poll.question}
                            </Link>
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
