

interface Props {
    icon?: string;
    name?: string;
    className?: string;
    onClick?: () => void;
}

const RockPaperScissorsCard = (props: Props) => {
    const { icon = "", name = "", className = "", onClick = () => { } } = props;
    return (
        <div onClick={onClick} className={`flex flex-col items-center text-white bg-gray-700 justify-center border-2 border-gray-300 rounded-4xl shadow-2xl hover:bg-gray-300 hover:text-black hover:cursor-pointer h-52 w-40 my-4 transition-all duration-300 ease-in-out ${className}`}>
            {icon && <p className="text-4xl">{icon}</p>}
            <h3 className="uppercase mt-2">{name && name}</h3>
        </div>
    )
}

export default RockPaperScissorsCard