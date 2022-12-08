import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PollForm from "../../components/PollForm";
import Link from "next/link";

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

const fetchById = async (id: string | string[]) => {
    const poll = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`
    );
    return poll.data.poll;
};

const EditPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [poll, setPoll] = useState<Poll>();

    useEffect(() => {
        if (!id) return;

        fetchById(id)
            .then((response) => setPoll(response))
            .catch((error) => console.error(error));
    }, [id]);

    if (!poll) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <Link className="float-right" href="/">
                    Home
                </Link>
                <PollForm ip={""} poll={poll} />
            </div>
        </div>
    );
};

export default EditPage;
