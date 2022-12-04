interface Props {
    options: string[];
    votes: number[];
}

const VoteBar = ({ options, votes }: Props) => {
    const colors = ["cyan", "#A855F7", "green"];

    console.log(options, votes);

    if (!options) return <div>Loading...</div>;

    if (votes[0] < 1 && votes[1] < 1) {
        return <div>No votes yet...</div>;
    }
    return (
        <div className="flex gap-5">
            {options.map((option, index) => {
                if (votes[index] < 1) {
                    return;
                }
                return (
                    <div
                        key={index}
                        style={{
                            flex: votes[index],
                            backgroundColor: colors[index],
                        }}
                        className="p-5 text-center"
                    >
                        {option}
                    </div>
                );
            })}
        </div>
    );
};

export default VoteBar;
