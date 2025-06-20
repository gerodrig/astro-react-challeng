import { useState, useEffect, useRef } from 'react';

const formatSeconds = (seconds: number) => seconds < 10 ? `0${seconds}` : seconds;

const Pomodoro = ({ initialMinutes = 15, initialSeconds = 0 }) => {

    const [timerStarted, setTimerStarted] = useState(false);
    const [time, setTime] = useState({
        minutes: initialMinutes,
        seconds: initialSeconds
    });
    const intervalRef = useRef<NodeJS.Timeout>();

    //Clear interval on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const startTimer = () => {
        clearInterval(intervalRef.current); //? Clear any existing Interval
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => {
                const { minutes, seconds } = prevTime;
                if (seconds === 0 && minutes === 0) {
                    clearInterval(intervalRef.current);
                    return prevTime;
                }

                if (seconds === 0) {

                    return {
                        minutes: minutes - 1,
                        seconds: 59,
                    }
                }

                return {
                    minutes: minutes,
                    seconds: seconds - 1
                }

            });
        }, 1000);
    };

    const onHandleStart = () => {
        setTime({
            minutes: initialMinutes,
            seconds: initialSeconds
        });
        setTimerStarted(true);
        startTimer();
    }

    const onHandleStop = () => {
        clearInterval(intervalRef.current);
        setTimerStarted(false);

    }


    return (
        <div className="flex flex-col h-72 mt-10 m-auto rounded-lg shadow-2xl p-5 w-64 bg-linear-to-t from-purple-500 to-pink-500 text-white font-bold tracking-wider">
            <div className="text-center ">
                {timerStarted ? <span> Press <b className="text-red-700">Stop</b> to end</span> : <span> Press <b className="text-green-500">Start </b>to begin</span>
                }
            </div>
            <div id="counter-box" className="self-center h-40 w-40 mt-4 text-center tracking-wider rounded-full border-2 border-black text-black flex flex-col items-center justify-center bg-yellow-500">
                <p><span id="minutes">{time.minutes}</span>:<span id="seconds">{formatSeconds(time.seconds)}</span></p>
                <div className="text-center">
                    {!timerStarted && <button onClick={onHandleStart} className="relative mt-2 uppercase tracking-wider border-none outline-none hover:cursor-pointer hover:text-blue-500">Start</button>}
                    {timerStarted && <button onClick={onHandleStop} className="relative mt-2 uppercase tracking-wider border-none outline-none hover:cursor-pointer hover:text-red-500">Stop</button>}

                </div>
            </div>
        </div>
    )
}

export default Pomodoro