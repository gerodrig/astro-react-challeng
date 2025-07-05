import { useEffect, useState } from "react"
import Loader from "./ui/Loader";

const QuoteGenerator = () => {
    const [quote, setQuote] = useState("");
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        handleLoadQuote()
    }, []);

    const handleLoadQuote = async () => {

        try {
            setIsLoading(true);
            const response = await fetch("https://api.gameofthronesquotes.xyz/v1/random");

            const data = await response.json();

            setQuote(data.sentence);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setQuote("Something went wrong");
        }
    }

    const handleNextQuote = () => {
        handleLoadQuote();
    }

    return (
        <div className="flex flex-col h-80 items-center text-white bg-gray-700 justify-center border-2 border-gray-300 rounded-4xl shadow-2xl">
            {loading ? <Loader className="my-4" /> : <p className="my-4 text-sm break-words text-center w-4/5">"{quote}"</p>}

            <button disabled={loading} onClick={handleNextQuote} className="bg-white text-black rounded-md p-3 hover:bg-gray-300 hover:text-black hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">Next Quote</button>
        </div>
    )
}

export default QuoteGenerator