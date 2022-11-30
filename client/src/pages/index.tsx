import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

type Props = {
    response: string;
};

const Home: NextPage<Props> = ({ response }) => {
    return (
        <div>
            <h1 className="text-4xl">{response}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await axios.get(process.env.SERVER_URL + "/api/test");
    return {
        props: {
            response: response.data.message,
        },
    };
};

export default Home;
