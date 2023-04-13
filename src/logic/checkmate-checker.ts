import {Colors} from "../constants/pieces-constants";
import {findPieceById} from "./board-util";
import {getPossibleMoves, kingPossibleMoves} from "./possible-moves";

export function isCheckConditionFunc(kingsPieceId: number, playerColor: Colors, board: Board): Coords[] | null {
    const kingPieceCoords = findPieceById(kingsPieceId, board)
    let kingInCheck = false

    if (kingPieceCoords == null)
        return null

    const possibleKingMoves = kingPossibleMoves(kingPieceCoords[0], kingPieceCoords[1], board, playerColor)

    const allPossibleMoves: Coords[] = []
    board.forEach((row, y_pos) => {
        row.forEach((cell, x_pos) => {
            if (!cell.isEmpty && cell.PieceColor != playerColor) {
                const possibleMoves = getPossibleMoves(y_pos, x_pos, board, cell.PieceName!, cell.PieceColor!)

                if (!kingInCheck)
                    kingInCheck = possibleMoves.some(possibleCoord => possibleCoord[0] === kingPieceCoords[0] && possibleCoord[1] === kingPieceCoords[1])

                allPossibleMoves.push(...possibleMoves)
            }
        })
    })

    if (!kingInCheck)
        return null

    return possibleKingMoves.filter(coord =>
        !allPossibleMoves.some(possibleCoord =>
            possibleCoord[0] === coord[0] && possibleCoord[1] === coord[1]
        )
    )
}