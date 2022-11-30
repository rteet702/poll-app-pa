interface Props {
    text: String;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const button_outline = ({ text, ...rest }: Props) => {
    return (
        <button
            className=" border-2 border-neutral-100 bg-lime-400 bg-opacity-0 px-10 py-2 rounded-lg shadow-lg hover:bg-opacity-100 hover:border-lime-400 transition-colors"
            {...rest}
        >
            {text}
        </button>
    );
};

export default button_outline;
