import {getDivId, getImgId} from "../logic/html-ids";
import {supabase} from "../supabase_setup";
import {setGameover} from "./set-gameover";
import {recordMoveFormatter} from "../logic/recording-move";

type RequestType = {
    GameId: string;
    UserId: string;
    PieceId: number;
    PositionX: number;
    PositionY: number;
    isPieceAlive: boolean;
    MoveText: string | null;
}

export default async function postNewMove(element: Element, pieceBeingDragged: string, gameid: string, userid: string, board: Board) {
    const { pieceId, x_pos: x_pos_original, pieceName  } = getImgId(pieceBeingDragged)
    const { x_pos, y_pos } = getDivId(element.id)

    const isCapture = !board[y_pos][x_pos].isEmpty
    const moveFormatted = recordMoveFormatter(pieceName, y_pos, x_pos, x_pos_original, isCapture)

    const request: RequestType[] = [{
        GameId: gameid,
        UserId: userid,
        PieceId: pieceId,
        PositionX: x_pos,
        PositionY: y_pos,
        isPieceAlive: true,
        MoveText: moveFormatted
    }]

    if (isCapture)
        request.push({
            GameId: gameid,
            UserId: userid,
            PieceId: board[y_pos][x_pos].PieceId,
            PositionX: x_pos,
            PositionY: y_pos,
            isPieceAlive: false,
            MoveText: null
        })

    await supabase.from('tblGameMoves').insert(request)

    if (pieceId === 15 || pieceId === 31)
        setGameover(gameid)
}