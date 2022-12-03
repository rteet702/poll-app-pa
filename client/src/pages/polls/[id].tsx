import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
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

const fetchById = async (id: string | string[]) => {
    const poll = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`
    );
    return poll.data.poll;
};

const DynamicPollPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState<Poll>();

    useEffect(() => {
        if (!id) return;
        fetchById(id)
            .then((poll) => {
                setPollData(poll);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleVote = async (option: number) => {
        const result = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`,
            { option }
        );
    };

    if (!pollData) return <div>Loading...</div>;

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-6xl text-center">{pollData.question}</h1>

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
            </div>
        </div>
    );
};

export default DynamicPollPage;
