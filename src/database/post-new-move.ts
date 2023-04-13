import {getDivId, getImgId} from "../logic/html-ids";
import {supabase} from "../supabase_setup";
import {recordMoveFormatter} from "../logic/recording-move";
import {ChessPieces} from "../constants/pieces-constants";
import {ROWS} from "../constants/board-constants";
import {setGameover} from "./set-gameover";

type RequestType = {
    GameId: string;
    UserId: string;
    PieceId: number;
    PositionX: number;
    PositionY: number;
    isPieceAlive: boolean;
    MoveText: string | null;
    isPromotedPawn: boolean
}

export default async function postNewMove(element: Element, pieceBeingDragged: string, gameid: string, userid: string, board: Board) {
    const { pieceId, x_pos: x_pos_original, pieceName, isPromotedPawn, pieceColor  } = getImgId(pieceBeingDragged)
    const { x_pos, y_pos } = getDivId(element.id)

    const originalPiece = board[y_pos][x_pos]
    const isCapture = !board[y_pos][x_pos].isEmpty
    const moveFormatted = recordMoveFormatter(pieceName, y_pos, x_pos, x_pos_original, isCapture)

    // check if pawn being promoted
    const isPromotedPawnNow = pieceName === ChessPieces.PAWN.valueOf() && (y_pos === 0 || y_pos === ROWS - 1)


    const request: RequestType[] = [{
        GameId: gameid,
        UserId: userid,
        PieceId: pieceId,
        PositionX: x_pos,
        PositionY: y_pos,
        isPieceAlive: true,
        MoveText: moveFormatted,
        isPromotedPawn: isPromotedPawn || isPromotedPawnNow
    }]

    if (isCapture)
        request.push({
            GameId: gameid,
            UserId: userid,
            PieceId: board[y_pos][x_pos].PieceId,
            PositionX: x_pos,
            PositionY: y_pos,
            isPieceAlive: false,
            MoveText: null,
            isPromotedPawn: isPromotedPawn || isPromotedPawnNow
        })


    await supabase.from('tblGameMoves').insert(request)

    if (originalPiece.PieceName === ChessPieces.KING)
        setGameover(gameid)
}