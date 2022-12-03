import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

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

const DynamicPollPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState<Poll>();

    useEffect(() => {
        if (!id) return;
        const fetchById = async () => {
            const poll = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`
            );
            return poll.data.poll;
        };
        fetchById()
            .then((poll) => {
                setPollData(poll);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!pollData) return <div>Loading...</div>;

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-6xl text-center">{pollData.question}</h1>

                <div className="flex gap-10 h-[300px] pt-10">
                    <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded shadow-xl text-4xl">
                        {pollData.firstOption}
                    </button>
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 transition-colors rounded shadow-xl text-4xl">
                        {pollData.secondOption}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicPollPage;
