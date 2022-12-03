const VoteButtonCyan = ({ ...rest }) => {
    return (
        <button
            {...rest}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded shadow-xl text-4xl"
        >
            {rest.text}
        </button>
    );
};

export default VoteButtonCyan;
