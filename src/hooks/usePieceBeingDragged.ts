import {useMemo, useState} from "react";
import {SHOW_POSSIBLE_MOVES_CSS} from "../constants/css-constants";
import {checkedKingBeingDraggedHandler} from "../logic/html-ids";
import {Colors} from "../constants/pieces-constants";

export default function usePieceBeingDragged(board: Board, isCheckCondition: null | Coords[], playerColor: Colors){

    // store piece being dragged's img element's id (null = no piece being dragged)
    const [pieceBeingDragged, setPieceBeingDragged] = useState<string | null>(null)

    // Setter for pieceBeingDragged - removes css highlighting when this piece changes
    const updatePieceBeingDragged = (newPiece: string | null) => {
        document.querySelectorAll('.chess-grid')
            .forEach(div => div.classList.remove(SHOW_POSSIBLE_MOVES_CSS))

        setPieceBeingDragged(newPiece)
    }

    // calculate all possible moves for this piece being dragged
    const possibleMoves: Coords[] = useMemo(() => {
        if (pieceBeingDragged == null)
            return []

        return checkedKingBeingDraggedHandler(pieceBeingDragged, board, isCheckCondition, playerColor)

        // return newPieceBeingDraggedHandler(pieceBeingDragged, board)
    }, [pieceBeingDragged, board])


    return [pieceBeingDragged, updatePieceBeingDragged, possibleMoves] as const
}