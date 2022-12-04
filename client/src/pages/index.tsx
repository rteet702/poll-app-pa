import { NextPage, GetServerSideProps } from "next";
import PollForm from "../components/PollForm";
import { useEffect, useState } from "react";
import ButtonFilled from "../components/button-filled";

interface Props {
    ip: string;
}

const Home: NextPage<Props> = ({ ip }) => {
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!server) {
            return;
        }
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
                    <PollForm ip={ip} />
                )}
            </div>
        </div>
    );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
    let ip;

    const { req } = context;

    if (req.headers["x-forwarded-for"]) {
        ip = (req.headers["x-forwarded-for"] as string).split(",")[0];
    } else if (req.headers["x-real-ip"]) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.connection.remoteAddress;
    }

    console.log(ip);
    return {
        props: {
            ip,
        },
    };
};
