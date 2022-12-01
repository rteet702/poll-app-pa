import TextInput from "../components/TextInput";
import ButtonOutline from "../components/button-outline";
import { FormEvent, useState } from "react";
import axios from "axios";

const PollForm = () => {
    const [question, setQuestion] = useState("");
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        if (server) {
            const response = await axios.post(server + "/api/polls", {
                question,
                firstOption,
                secondOption,
            });
            return true;
        }
        return false;
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

            <hr />

            <ButtonOutline text="Create Poll!" />
        </form>
    );
};

export default PollForm;
