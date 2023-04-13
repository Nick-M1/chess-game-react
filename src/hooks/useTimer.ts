import {useEffect, useState} from "react";

export default function useTimer(seconds: number) {
    const [timeLeft, setTimeLeft] = useState(seconds);

    const resetTimer = () => setTimeLeft(seconds)


    useEffect(() => {
        if (!timeLeft)
            return;

        const intervalId = setInterval(() => {
            setTimeLeft( prevState => prevState - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return [timeLeft, resetTimer] as const
}