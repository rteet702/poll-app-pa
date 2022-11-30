interface Props {
    text: String;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const button_circle = ({ text, ...rest }: Props) => {
    return (
        <button
            className="border-2 border-lime-600 hover:bg-lime-400 hover:border-lime-400 transition-colors bg-lime-600 h-[52px] w-[52px] rounded-full shadow-lg"
            {...rest}
        >
            {text}
        </button>
    );
};

export default button_circle;
