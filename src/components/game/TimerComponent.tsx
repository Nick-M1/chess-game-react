import useTimer from "../../hooks/useTimer";
import {ROUND_SECONDS} from "../../constants/board-constants";
import {formatNumberToNumOfDigits} from "../../logic/number-utils";

type Props = {
    className: string
}

export default function TimerComponent({ className }: Props) {
    const [timeLeft, resetTimer] = useTimer(ROUND_SECONDS)


    return (
        <div className={`bg-white/10 px-3 py-2 mx-auto w-16 tabular-nums text-center tracking-widest font-bold text-xl rounded-md ${className}`}>
            { formatNumberToNumOfDigits(timeLeft, 2) }
        </div>
    );
}