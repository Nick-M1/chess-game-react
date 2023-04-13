import {useEffect, useState} from "react";
import getGameinfo from "../database/get-gameinfo";
import {supabase} from "../supabase_setup";

export default function useGameInfo(gameid: string) {
    const [gameInfo, setGameInfo] = useState<GameInfoType | null>(null)

    useEffect(() => {
        getGameinfo(gameid)
            .then(data => {
                setGameInfo(data)
            })
    }, [])


    useEffect(() => {
        const tblGameInfo = supabase.channel('gameinfo-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tblChessGames', filter: `GameId=eq.${gameid}` },
                (payload) => {
                    getGameinfo(gameid)
                        .then(data => {
                            setGameInfo(data)
                        })
                }
            ).subscribe()

        return () => {
            tblGameInfo.unsubscribe()
        }
    }, [])

    return gameInfo
}