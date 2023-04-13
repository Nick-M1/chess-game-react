import {ChessPieces, Colors} from "../constants/pieces-constants";
import {COLUMNS, ROWS} from "../constants/board-constants";

export function getPossibleMoves(y_pos: number, x_pos: number, board: Board, pieceName: ChessPieces, pieceColor: Colors) {
    switch (pieceName) {
        case ChessPieces.PAWN:
            return pawnPossibleMoves(y_pos, x_pos, board, pieceColor)

        case ChessPieces.KNIGHT:
            return knightPossibleMoves(y_pos, x_pos, board, pieceColor)

        case ChessPieces.BISHOP:
            return bishopPossibleMoves(y_pos, x_pos, board, pieceColor)

        case ChessPieces.ROOK:
            return rookPossibleMoves(y_pos, x_pos, board, pieceColor)

        case ChessPieces.QUEEN:
            return queenPossibleMoves(y_pos, x_pos, board, pieceColor)

        case ChessPieces.KING:
            return kingPossibleMoves(y_pos, x_pos, board, pieceColor)

        default:
            return [] as Coords[]
    }
}

function checkThisDirection(currY: number, currX: number, blocked: boolean, board: Board, opponentColor: Colors, possibleMoves: Coords[]) {
    if (!(!blocked && 0 <= currX && currX < COLUMNS && 0 <= currY && currY < ROWS))
        return true

    if (board[currY][currX].isEmpty) {
        possibleMoves.push([currY, currX])
        return false
    }

    if (board[currY][currX].PieceColor == opponentColor)
        possibleMoves.push([currY, currX])

    return true
}

function pawnPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    const thisPieceDirection = playerColor == Colors.BLACK ? -1 : 1
    const thisPieceStartingRow = playerColor == Colors.BLACK ? 1 : ROWS - 2
    const opponentColor = playerColor == Colors.BLACK ? Colors.WHITE : Colors.BLACK

    const possibleMoves: Coords[] = []

    if (y - 1 * thisPieceDirection < COLUMNS && board[y - 1 * thisPieceDirection][x].isEmpty)
        possibleMoves.push([ y - 1 * thisPieceDirection, x ])

    if (y === thisPieceStartingRow && board[y - 2 * thisPieceDirection][x].isEmpty && board[y - 1 * thisPieceDirection][x].isEmpty )
        possibleMoves.push([ y - 2 * thisPieceDirection, x ])

    if (y - 1 * thisPieceDirection < COLUMNS && x + 1 < ROWS && board[y - 1 * thisPieceDirection][x + 1].PieceColor === opponentColor)
        possibleMoves.push([y - 1 * thisPieceDirection, x + 1])

    if (y - 1 * thisPieceDirection < COLUMNS && 0 < x && board[y - 1 * thisPieceDirection][x - 1].PieceColor === opponentColor)
        possibleMoves.push([y - 1 * thisPieceDirection, x - 1])

    return possibleMoves
}

function knightPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    const possibleMoves: Coords[] = [
        [y+1, x+2],
        [y-1, x+2],
        [y+2, x+1],
        [y-2, x+1],
        [y-1, x-2],
        [y+1, x-2],
        [y+2, x-1],
        [y-2, x-1],
    ]

    return possibleMoves
        .filter(([y, x]) => 0 <= y && y < COLUMNS && 0 <= x && x < ROWS && (board[y][x].isEmpty || board[y][x].PieceColor != playerColor))
}

function bishopPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    const opponentColor = playerColor == Colors.BLACK ? Colors.WHITE : Colors.BLACK
    const possibleMoves: Coords[] = []

    let ur_blocked = false
    let dr_blocked = false
    let ul_blocked = false
    let dl_blocked = false

    for (let i = 1; i < COLUMNS; i++) {
        // upper right
        const currY_ur = y + i
        const currX_ur = x + i

        // down right
        const currY_dr = y - i
        const currX_dr = x + i

        // upper left
        const currY_ul = y + i
        const currX_ul = x - i

        // down left
        const currY_dl = y - i
        const currX_dl = x - i

        // do checks
        ur_blocked = checkThisDirection(currY_ur, currX_ur, ur_blocked, board, opponentColor, possibleMoves)
        dr_blocked = checkThisDirection(currY_dr, currX_dr, dr_blocked, board, opponentColor, possibleMoves)
        ul_blocked = checkThisDirection(currY_ul, currX_ul, ul_blocked, board, opponentColor, possibleMoves)
        dl_blocked = checkThisDirection(currY_dl, currX_dl, dl_blocked, board, opponentColor, possibleMoves)
    }

    return possibleMoves
}

function rookPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    const opponentColor = playerColor == Colors.BLACK ? Colors.WHITE : Colors.BLACK
    const possibleMoves: Coords[] = []

    let u_blocked = false
    let d_blocked = false
    let l_blocked = false
    let r_blocked = false

    for (let i = 1; i < COLUMNS; i++) {
        // up
        const currY_u = y + i
        const currX_u = x

        // down
        const currY_d = y - i
        const currX_d = x

        // left
        const currY_l = y
        const currX_l = x - i

        // right
        const currY_r = y
        const currX_r = x + i

        // do checks
        u_blocked = checkThisDirection(currY_u, currX_u, u_blocked, board, opponentColor, possibleMoves)
        d_blocked = checkThisDirection(currY_d, currX_d, d_blocked, board, opponentColor, possibleMoves)
        l_blocked = checkThisDirection(currY_l, currX_l, l_blocked, board, opponentColor, possibleMoves)
        r_blocked = checkThisDirection(currY_r, currX_r, r_blocked, board, opponentColor, possibleMoves)
    }

    return possibleMoves
}

function queenPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    return bishopPossibleMoves(y, x, board, playerColor)
        .concat(rookPossibleMoves(y, x, board, playerColor))
}

export function kingPossibleMoves(y: number, x: number, board: Board, playerColor: Colors) {
    const possibleMoves: Coords[] = [
        [y + 1, x + 1],
        [y    , x + 1],
        [y - 1, x + 1],
        [y + 1, x    ],
        [y - 1, x    ],
        [y + 1, x - 1],
        [y    , x - 1],
        [y - 1, x - 1],
    ]

    return possibleMoves
        .filter(([y, x]) => 0 <= y && y < COLUMNS && 0 <= x && x < ROWS && (board[y][x].isEmpty || board[y][x].PieceColor != playerColor))
}