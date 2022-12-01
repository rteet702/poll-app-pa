import { NextPage } from "next";
import PollForm from "../components/PollForm";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ButtonFilled from "../components/button-filled";

const Home: NextPage = () => {
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!server) {
            return;
        }
        const socket = io(server, {
            extraHeaders: {
                "secure-header": "true",
            },
        });

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-neutral-700 container p-12 backdrop-blur-md bg-opacity-5 shadow-lg rounded-lg">
                <button className="float-right">Login</button>

                <h1 className="text-8xl">Pollgram</h1>

                <p className="py-5">Whatever questions you have... ask away!</p>

                {!formVisibility ? (
                    <ButtonFilled
                        text="Begin"
                        onClick={() => {
                            setFormVisibility((prev) => !prev);
                        }}
                    />
                ) : (
                    <PollForm />
                )}
            </div>
        </div>
    );
};

export default Home;
