import {useEffect} from "react";
import toast from "react-hot-toast";
import {toastOptionsCustom} from "../logic/toast-options-custom";

export default function useToastPopups(pieceBeingDragged: string | null, isPlayersTurn: boolean, isChecked: boolean, gameover: boolean) {

    useEffect(() => {
        if (gameover) {
            toast.dismiss('game-event')
            toast.dismiss('game-event-checked')
            return
        }

        if (pieceBeingDragged != null)
            toast('You have picked up', toastOptionsCustom({ id: 'game-event', duration: 100_000, icon: '♟️' }, 'lightcyan'))
        else if (isPlayersTurn)
            toast.loading('Its your turn...', toastOptionsCustom({ id: 'game-event', duration: 100_000, icon: '🫵' }, 'lightcyan'))
        else
            toast("Please wait, its the other player's turn...", toastOptionsCustom({ id: 'game-event', duration: 100_000, icon: '⌛' }, 'lightpink'))
    }, [isPlayersTurn, pieceBeingDragged, gameover])

    useEffect(() => {
        if (isChecked && !gameover)
            toast('Your king is checked and could be eliminated the next round', toastOptionsCustom({ id: 'game-event-checked', icon: '😥' }, 'red'))
        else
            toast.dismiss('game-event-checked')
    }, [isChecked])

}