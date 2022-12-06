import TextInput from "../components/TextInput";
import ButtonOutline from "../components/button-outline";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
    ip: string;
}

const PollForm = ({ ip }: Props) => {
    const [question, setQuestion] = useState("");
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");
    const [expiresAfter, setExpireAfter] = useState<number>();
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
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

    return (
        <form className="w-2/3 flex flex-col gap-5" onSubmit={handleSubmit}>
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
