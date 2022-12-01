import { NextPage } from "next";
import PollForm from "../components/PollForm";
import { io } from "socket.io-client";
import { useEffect } from "react";

const Home: NextPage = () => {
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
                <h1 className="text-8xl">Pollgram</h1>
                <p className="py-5">Whatever questions you have... ask away!</p>

                <div className="py-6" />

                <PollForm />
            </div>
        </div>
    );
};

export default Home;
