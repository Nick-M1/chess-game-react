import {getDivId, getImgId} from "../logic/html-ids";
import {supabase} from "../supabase_setup";
import {setGameover} from "./set-gameover";

export default async function postNewMove(element: Element, pieceBeingDragged: string, gameid: string, userid: string, board: Board) {
    const pieceId = getImgId(pieceBeingDragged).pieceId
    const { x_pos, y_pos } = getDivId(element.id)

    const request = [{
        GameId: gameid,
        UserId: userid,
        PieceId: pieceId,
        PositionX: x_pos,
        PositionY: y_pos,
        isPieceAlive: true
    }]

    if (!board[y_pos][x_pos].isEmpty)
        request.push({
            GameId: gameid,
            UserId: userid,
            PieceId: board[y_pos][x_pos].PieceId,
            PositionX: x_pos,
            PositionY: y_pos,
            isPieceAlive: false
        })

    await supabase.from('tblGameMoves').insert(request)

    if (pieceId === 15 || pieceId === 31)
        setGameover(gameid)
}