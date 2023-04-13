import {COLUMNS, ROWS} from "../constants/board-constants";

export function defaultCell(): Cell {
    return { PieceId: -1, isEmpty: true, isPromotedPawn: false }
}

export function createBoard(): Board {
    return Array(ROWS).fill(null)
        .map(() => Array(COLUMNS).fill(defaultCell()))
}

export function findPieceByIdAndReplaceWithDefaultCell(pieceId: number, board: Board) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (!board[i][j].isEmpty && board[i][j].PieceId === pieceId) {
                let tempPiece = board[i][j]
                board[i][j] = defaultCell()
                return tempPiece
            }
        }
    }

    return null
}

export function findPieceById(pieceId: number, board: Board) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (!board[i][j].isEmpty && board[i][j].PieceId === pieceId) {
                return [i, j] as const
            }
        }
    }

    return null
}