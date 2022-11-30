import { NextPage } from "next";
import ButtonFilled from "../components/button-filled";
import ButtonOutline from "../components/button-outline";
import ButtonCircle from "../components/button-circle";
import ButtonCircleOutline from "../components/button-circle-outline";

const Home: NextPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <h1 className="text-8xl">Pollgram</h1>
                <p className="py-5">Whatever questions you have... ask away!</p>

                <div className="flex gap-5">
                    <ButtonFilled
                        text="Click me!"
                        onClick={() => console.log("test")}
                    />
                    <ButtonOutline
                        text="Click me!"
                        onClick={() => console.log("test")}
                    />
                    <ButtonCircle
                        text="➜"
                        onClick={() => console.log("test")}
                    />
                    <ButtonCircleOutline
                        text="➜"
                        onClick={() => console.log("test")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
