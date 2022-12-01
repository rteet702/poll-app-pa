import { NextPage } from "next";
import PollForm from "../components/PollForm";

const Home: NextPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-8xl">Pollgram</h1>
                <p className="py-5">Whatever questions you have... ask away!</p>

                <div className="py-6" />

                <PollForm />
            </div>
        </div>
    );
};

export default Home;
