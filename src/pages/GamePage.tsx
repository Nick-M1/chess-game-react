import {useParams} from "react-router-dom";
import GameSetup from "../components/game/GameSetup";
import {LOCALSTORAGE_BOARD_THEME, LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";
import {themeMapper} from "../constants/themes-board";

export function loader() {
    const themeKey = localStorage.getItem(LOCALSTORAGE_BOARD_THEME)

    const theme = themeMapper(themeKey)
    document.documentElement.style.setProperty('--color-cell-light', theme.light)
    document.documentElement.style.setProperty('--color-cell-dark', theme.dark)

    return null
}

export function Component() {
    const { gameid } = useParams()
    const userid = window.localStorage.getItem(LOCALSTORAGE_USERID_KEY)

    if (typeof gameid == 'undefined' || userid == null)
        return <div>ERROR: REDIRECT TO HOME</div>

    return <GameSetup gameid={gameid} userid={userid}/>
}