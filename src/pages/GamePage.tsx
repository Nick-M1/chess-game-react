import {useParams} from "react-router-dom";
import GameSetup from "../components/game/GameSetup";
import {LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";

export function Component() {
    const { gameid } = useParams()
    const userid = window.localStorage.getItem(LOCALSTORAGE_USERID_KEY)

    if (typeof gameid == 'undefined' || userid == null)
        return <div>ERROR: REDIRECT TO HOME</div>

    return <GameSetup gameid={gameid} userid={userid}/>
}