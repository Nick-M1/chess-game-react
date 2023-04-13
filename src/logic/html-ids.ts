// returns true if div and img ids point to same cell position
import {ChessPieces, Colors} from "../constants/pieces-constants";
import {getPossibleMoves} from "./possible-moves";
import {SHOW_POSSIBLE_MOVES_CSS} from "../constants/css-constants";

export function compareDivAndImgId(divId: string, imgId: string) {
    return divId[5] === imgId[4] && divId[6] === imgId[5]
}

// Div (cell)
export function setDivId(x_pos: number, y_pos: number) {
    return `cell-${x_pos}${y_pos}`
}

export function getDivId(divId: string) {
    return {
        x_pos: Number(divId[5]),
        y_pos: Number(divId[6])
    }
}

// Img (piece)
export function setImgId(x_pos: number, y_pos: number, pieceId: number, pieceColor: Colors, pieceName: ChessPieces, isPromotedPawn: boolean) {
    const pieceIdString = pieceId.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    return `img-${x_pos}${y_pos}-${pieceIdString}-${pieceColor}${pieceName}-${Number(isPromotedPawn)}`
}

export function getImgId(imgId: string) {
    return {
        x_pos: Number(imgId[4]),
        y_pos: Number(imgId[5]),
        pieceId: Number(`${imgId[7]}${imgId[8]}`),
        pieceColor: Number(imgId[10]),
        pieceName: Number(imgId[11]),
        isPromotedPawn: imgId[13] === '1'
    }
}


// export function newPieceBeingDraggedHandler(pieceBeingDragged: string, board: Board) {
//     const { x_pos, y_pos, pieceId, pieceColor, pieceName } = getImgId(pieceBeingDragged)
//     const possibleMoves = getPossibleMoves(y_pos, x_pos, board, pieceName, pieceColor)
//
//     possibleMoves.forEach(([y, x]) => {
//         const element = document.getElementById(setDivId(x, y))
//         if (element)
//             element.classList.add(SHOW_POSSIBLE_MOVES_CSS)
//     })
//
//     return possibleMoves
// }

export function checkedKingBeingDraggedHandler(pieceBeingDragged: string, board: Board, isCheckCondition: null | Coords[], playerColor: Colors) {
    const { x_pos, y_pos, pieceId, pieceColor, pieceName } = getImgId(pieceBeingDragged)

    const kingsPieceId = playerColor == Colors.BLACK ? 15 : 31
    const possibleMoves = isCheckCondition != null && pieceId === kingsPieceId
        ? isCheckCondition
        : getPossibleMoves(y_pos, x_pos, board, pieceName, pieceColor)


    possibleMoves.forEach(([y, x]) => {
        const element = document.getElementById(setDivId(x, y))
        if (element)
            element.classList.add(SHOW_POSSIBLE_MOVES_CSS)
    })

    return possibleMoves
}