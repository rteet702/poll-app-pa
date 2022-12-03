const VoteButtonPurple = ({ ...rest }) => {
    return (
        <button
            {...rest}
            className="flex-1 bg-purple-500 hover:bg-purple-600 transition-colors rounded shadow-xl text-4xl"
        >
            {rest.text}
        </button>
    );
};

export default VoteButtonPurple;
