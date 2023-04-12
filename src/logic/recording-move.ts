import {ROWS} from "../constants/board-constants";
import {xPositionToChar} from "./pieces-util";
import {ChessPieces} from "../constants/pieces-constants";

const pieceToSymbol = {
    0: '',
    1: 'B',
    2: 'N',
    3: 'R',
    4: 'Q',
    5: 'K'
}

function coordFormatter(y_pos: number, x_pos: number) {
    return `${xPositionToChar[x_pos]}${ROWS - y_pos}`
}

export function recordMoveFormatter(pieceName: ChessPieces, y_pos: number, x_pos: number, x_pos_original: number, isCapture: boolean) {
    if (pieceName === ChessPieces.PAWN)
        return `${isCapture ? `${xPositionToChar[x_pos_original]}x` : ''}${coordFormatter(y_pos, x_pos)}`

    return `${pieceToSymbol[pieceName]}${isCapture ? 'x' : ''}${coordFormatter(y_pos, x_pos)}`
}