import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

type Poll = {
    id: string;
    question: string;
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

    return <div>{pollData.question}</div>;
};

export default DynamicPollPage;
