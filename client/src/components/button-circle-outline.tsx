interface Props {
    text: String;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const button_outline = ({ text, ...rest }: Props) => {
    return (
        <button
            className=" border-2 border-neutral-100 bg-lime-400 bg-opacity-0 h-[52px] w-[52px] rounded-full shadow-lg hover:bg-opacity-100 hover:border-lime-400 transition-colors"
            {...rest}
        >
            {text}
        </button>
    );
};

export default button_outline;
