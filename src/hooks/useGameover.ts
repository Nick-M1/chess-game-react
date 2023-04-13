import {useEffect, useState} from "react";
import {setGameover} from "../database/set-gameover";

export default function useGameover(gameid: string, gameoverTimestamp: null | string, isCheckCondition: Coords[] | null) {
    const [gameoverModalOpen, setGameoverModalOpen] = useState(false)

    useEffect(() => {
        if (gameoverTimestamp == null && isCheckCondition != null && isCheckCondition.length === 0)
            setGameover(gameid)

        if (gameoverTimestamp)
            setGameoverModalOpen(true)

    }, [gameoverTimestamp, isCheckCondition])

    return [gameoverModalOpen, setGameoverModalOpen] as const
}