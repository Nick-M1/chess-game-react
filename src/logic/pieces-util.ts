import {ChessPieces, Colors, pieceToImageMap} from "../constants/pieces-constants";


export function pieceToImageMapper(piece: ChessPieces, color: Colors.BLACK | Colors.WHITE) {
    return pieceToImageMap[`${color}${piece}`]
}

export const xPositionToChar: { [key: number]: string } = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
}