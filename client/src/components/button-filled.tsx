interface Props {
    text: String;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const button_filled = ({ text, ...rest }: Props) => {
    return (
        <button
            className="border-2 border-lime-600 hover:bg-lime-400 hover:border-lime-400 transition-colors bg-lime-600 px-10 py-2 rounded-lg shadow-lg"
            {...rest}
        >
            {text}
        </button>
    );
};

export default button_filled;
