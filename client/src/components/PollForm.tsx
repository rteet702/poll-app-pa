import TextInput from "../components/TextInput";
import ButtonOutline from "../components/button-outline";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
    poll?: Poll;
}

const PollForm = ({ ip, poll }: Props) => {
    const [question, setQuestion] = useState(poll ? poll.question : "");
    const [firstOption, setFirstOption] = useState(
        poll ? poll.firstOption : ""
    );
    const [secondOption, setSecondOption] = useState(
        poll ? poll.secondOption : ""
    );
    const [expiresAfter, setExpireAfter] = useState<number>();
    const router = useRouter();

    const handleCreate = async (event: FormEvent) => {
        event.preventDefault();
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!server) return;
        const poll = await axios.post(server + "/api/polls", {
            question,
            firstOption,
            secondOption,
            ip,
            expiresAfter,
        });
        setQuestion("");
        setFirstOption("");
        setSecondOption("");
        router.push(`/polls/${poll.data.poll.id}`);
    };

    const handleEdit = async (event: FormEvent) => {
        event.preventDefault();
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!server) return;
        const edit = await axios.put(server + "/api/polls", {
            id: poll?.id,
            question,
            firstOption,
            secondOption,
            ip,
            expiresAfter,
        });
        setQuestion("");
        setFirstOption("");
        setSecondOption("");
        router.push(`/polls/${poll?.id}`);
    };

    // if editing
    if (poll) {
        return (
            <form className="w-2/3 flex flex-col gap-5" onSubmit={handleEdit}>
                <p className="text-3xl">Editing {poll.question}</p>
                <TextInput
                    placeholder="What's your debate?"
                    value={question}
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setQuestion(e.currentTarget.value)
                    }
                />

                <hr />

                <TextInput
                    placeholder="Option 1..."
                    value={firstOption}
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setFirstOption(e.currentTarget.value)
                    }
                />
                <TextInput
                    placeholder="Option 2..."
                    value={secondOption}
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setSecondOption(e.currentTarget.value)
                    }
                />
                <TextInput
                    placeholder="expire after how many minutes?"
                    value={expiresAfter}
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setExpireAfter(Number(e.currentTarget.value))
                    }
                />

                <hr />

                <ButtonOutline text="Edit Poll!" />
            </form>
        );
    }

    // if creating
    return (
        <form className="w-2/3 flex flex-col gap-5" onSubmit={handleCreate}>
            <TextInput
                placeholder="What's your debate?"
                value={question}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                    setQuestion(e.currentTarget.value)
                }
            />

            <hr />

            <TextInput
                placeholder="Option 1..."
                value={firstOption}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                    setFirstOption(e.currentTarget.value)
                }
            />
            <TextInput
                placeholder="Option 2..."
                value={secondOption}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                    setSecondOption(e.currentTarget.value)
                }
            />
            <TextInput
                placeholder="time in minutes..."
                value={expiresAfter}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                    setExpireAfter(Number(e.currentTarget.value))
                }
            />

            <hr />

            <ButtonOutline text="Create Poll!" />
        </form>
    );
};

export default PollForm;
