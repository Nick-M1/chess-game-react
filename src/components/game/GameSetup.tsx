import {GameActive} from "./GameActive";
import useGameInfo from "../../hooks/useGameInfo";
import GameLobby from "../setup/GameLobby";

type Props = {
    gameid: string
    userid: string
}

export default function GameSetup({ gameid, userid }: Props) {
    const gameInfo = useGameInfo(gameid)

    if (gameInfo == null)
        return <div className='w-screen h-screen bg-neutral-800'>CREATE NEW GAME</div>

    if (gameInfo.userid_white == null || gameInfo.userid_black == null)
        return <GameLobby gameid={gameid}/>

    return <GameActive gameid={gameid} userid={userid} gameInfo={gameInfo}/>
}