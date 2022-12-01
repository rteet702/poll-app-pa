import TextInput from "../components/TextInput";
import ButtonOutline from "../components/button-outline";
import { FormEvent, useState } from "react";

const PollForm = () => {
    const [question, setQuestion] = useState("");
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    return (
        <form className="w-2/3 flex flex-col gap-5">
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

            <ButtonOutline text="Continue" />
        </form>
    );
};

export default PollForm;
