import { NextPage } from "next";
import ButtonFilled from "../components/button-filled";
import ButtonOutline from "../components/button-outline";

const Home: NextPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-8xl">Pollgram</h1>
                <p className="py-5">Whatever questions you have... ask away!</p>
                <ButtonFilled
                    text="Click me!"
                    onClick={() => console.log("test")}
                />
                <ButtonOutline
                    text="Click me!"
                    onClick={() => console.log("test")}
                />
            </div>
        </div>
    );
};

export default Home;
