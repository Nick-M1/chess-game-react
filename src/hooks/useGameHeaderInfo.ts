import {useMemo} from "react";
import {Colors} from "../constants/pieces-constants";
import {profileImgsMapper} from "../constants/profile-imgs-constants";

export default function useGameHeaderInfo(playerColor: Colors, gameinfo: GameInfoType) {
    return useMemo(() => (
        playerColor === Colors.WHITE
            ? {
                leftPlayerName: gameinfo.username_white,
                leftPlayerColor: 'White',
                leftPlayerImage: profileImgsMapper(gameinfo.image_white || 'default'),

                rightPlayerName: gameinfo.username_black,
                rightPlayerColor: 'Black',
                rightPlayerImage: profileImgsMapper(gameinfo.image_black || 'default'),
            } : {
                leftPlayerName: gameinfo.username_black,
                leftPlayerColor: 'Black',
                leftPlayerImage: profileImgsMapper(gameinfo.image_black || 'default'),

                rightPlayerName: gameinfo.username_white,
                rightPlayerColor: 'White',
                rightPlayerImage: profileImgsMapper(gameinfo.image_white || 'default'),
            }
    ), [playerColor, gameinfo])
}