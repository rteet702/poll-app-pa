interface Props {}

const TextInput = ({ ...rest }) => {
    return (
        <input
            type="text"
            className="bg-transparent border-2 border-neutral-50 py-2 px-4 rounded-lg focus:outline-none w-full"
            {...rest}
        />
    );
};

export default TextInput;
