import {pieceToImageMapper, xPositionToChar} from "../../logic/pieces-util";
import React from "react";
import {setDivId, setImgId} from "../../logic/html-ids";
import {
    onClickDiv, onClickImg,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop
} from "../../logic/drag-drop-handlers";
import {COLUMNS, ROWS} from "../../constants/board-constants";
import {Colors} from "../../constants/pieces-constants";

type Props = {
    cell: Cell
    x_pos: number
    y_pos: number
    canMoveHere: boolean
    canMovePiece: boolean
    isCheckCondition: null | Coords[]
    kingsPieceId: number

    gameid: string
    userid: string
    board: Board

    pieceBeingDragged: string | null
    setPieceBeingDragged: (newPiece: (string | null)) => void
}


export default function PieceComponent({ cell, y_pos, x_pos, canMoveHere, canMovePiece, isCheckCondition, kingsPieceId, gameid, userid, board, pieceBeingDragged, setPieceBeingDragged }: Props) {

    return (
        <div
            id={setDivId(x_pos, y_pos)}
            className='chess-grid relative'

            onDrop={(e) => onDrop(e, pieceBeingDragged, canMoveHere, gameid, userid, board)}
            onDragOver={(e) => onDragOver(e)}
            onDragEnter={(e) => onDragEnter(e, pieceBeingDragged, canMoveHere)}
            onDragLeave={(e) => onDragLeave(e, pieceBeingDragged)}
            // onDragEnd={onDragEndCell}

            onClick={(e) => onClickDiv(e, pieceBeingDragged, setPieceBeingDragged, canMoveHere, gameid, userid, board)}
        >
            { x_pos === 0 && <p className='absolute ml-1 pointer-events-none font-bold'>{ROWS - y_pos}</p>}
            { y_pos === COLUMNS - 1 && <p className='absolute bottom-0 right-0 mr-1 pointer-events-none font-bold'>{xPositionToChar[x_pos]}</p>}

            { isCheckCondition != null && cell.PieceId === kingsPieceId && <p className='absolute top-0 right-0 w-5 h-5 mr-1 pointer-events-none font-bold text-white bg-red-500 rounded-full flex justify-center items-center text-sm'>!!</p>}

            { !cell.isEmpty &&
                <img
                    id={setImgId(x_pos, y_pos, cell.PieceId, cell.PieceColor!, cell.PieceName!, cell.isPromotedPawn)}
                    src={pieceToImageMapper(cell.PieceName!, cell.PieceColor!)}
                    alt='cell'
                    draggable={canMovePiece}

                    onDragStart={(e) => onDragStart(e, setPieceBeingDragged)}
                    onDragEnd={(e) => onDragEnd(e, setPieceBeingDragged)}
                    // onDrag={onDrag}

                    onClick={(e) => onClickImg(e, canMovePiece, pieceBeingDragged, setPieceBeingDragged)}
                />
            }

        </div>
    )
}