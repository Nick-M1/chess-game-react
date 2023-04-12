import svg00 from "../assets/pieces/00.svg"
import svg01 from "../assets/pieces/01.svg"
import svg02 from "../assets/pieces/02.svg"
import svg03 from "../assets/pieces/03.svg"
import svg04 from "../assets/pieces/04.svg"
import svg05 from "../assets/pieces/05.svg"
import svg10 from "../assets/pieces/10.svg"
import svg11 from "../assets/pieces/11.svg"
import svg12 from "../assets/pieces/12.svg"
import svg13 from "../assets/pieces/13.svg"
import svg14 from "../assets/pieces/14.svg"
import svg15 from "../assets/pieces/15.svg"

export const NUMBER_OF_PIECES = 6

export enum ChessPieces {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum Colors {
    BLACK,
    WHITE
}

export const pieceToImageMap = {
    '00': svg00,
    '01': svg01,
    '02': svg02,
    '03': svg03,
    '04': svg04,
    '05': svg05,
    '10': svg10,
    '11': svg11,
    '12': svg12,
    '13': svg13,
    '14': svg14,
    '15': svg15,
}
