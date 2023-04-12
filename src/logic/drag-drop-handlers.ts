import {DROP_PIECE_CSS, HOVER_DRAG_CSS} from "../constants/css-constants";
import postNewMove from "../database/post-new-move";
import React from "react";
import {compareDivAndImgId, getImgId} from "./html-ids";


// PIECE EVENT LISTENERS ---
// When this piece is picked up (initially)
export function onDragStart(event: React.DragEvent<HTMLImageElement>, setPieceBeingDragged: (newPiece: (string | null)) => void) {
    if (!(event.target instanceof Element))
        return

    setPieceBeingDragged(event.target.id)
}


// When this piece is dropped (initially)
export function onDragEnd(event: React.DragEvent<HTMLImageElement>, setPieceBeingDragged: (newPiece: (string | null)) => void) {
    setPieceBeingDragged(null)
}


export function onClickImg(event: React.MouseEvent<HTMLImageElement, MouseEvent>, canMovePiece: boolean, pieceBeingDragged: string | null, setPieceBeingDragged: (newPiece: (string | null)) => void) {
    if (!(event.target instanceof Element))
        return

    setPieceBeingDragged(!canMovePiece || (pieceBeingDragged !== null && pieceBeingDragged === event.target.id) ? null : event.target.id)
}





// CELL EVENT LISTENERS ---
// When a piece is dropped on this cell
export function onDrop(event: React.DragEvent<HTMLDivElement>, pieceBeingDragged: string | null, canMoveHere: boolean, gameid: string, userid: string, board: Board) {
    if (!(event.target instanceof Element))
        return

    const eventElement = event.target.nodeName === "IMG" ? event.target.parentElement! : event.target

    if (pieceBeingDragged && canMoveHere)
        postNewMove(eventElement, pieceBeingDragged, gameid, userid, board)

    eventElement.classList.remove(...HOVER_DRAG_CSS)
    eventElement.classList.add(DROP_PIECE_CSS)
    setTimeout(() => eventElement.classList.remove(DROP_PIECE_CSS), 300)
}


export function onClickDiv(event: React.MouseEvent<HTMLDivElement, MouseEvent>, pieceBeingDragged: string | null, setPieceBeingDragged: (newPiece: (string | null)) => void, canMoveHere: boolean, gameid: string, userid: string, board: Board) {
    if (!(event.target instanceof Element))
        return

    const eventElement = event.target.nodeName === "IMG" ? event.target.parentElement! : event.target

    if (pieceBeingDragged && canMoveHere) {
        postNewMove(eventElement, pieceBeingDragged, gameid, userid, board)

        eventElement.classList.add(DROP_PIECE_CSS)
        setTimeout(() => eventElement.classList.remove(DROP_PIECE_CSS), 300)

        setPieceBeingDragged(null)
    }

    eventElement.classList.remove(...HOVER_DRAG_CSS)
}


// When a piece is dragged over this cell (continuously)
export function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
}

// When a piece is initially dragged over this cell
export function onDragEnter(event: React.DragEvent<HTMLDivElement>, pieceBeingDragged: string | null, canMoveHere: boolean) {
    if (!(event.target instanceof Element) || pieceBeingDragged == null)
        return

    const eventElement = event.target.nodeName === "IMG" ? event.target.parentElement! : event.target

    if (!compareDivAndImgId(eventElement.id, pieceBeingDragged) && canMoveHere)
        eventElement.classList.add(...HOVER_DRAG_CSS)
}


// When a piece being dragged leaves this cell
export function onDragLeave(event: React.DragEvent<HTMLDivElement>, pieceBeingDragged: string | null) {
    if (!(event.target instanceof Element) || pieceBeingDragged == null)
        return

    const eventElement = event.target.nodeName === "IMG" ? event.target.parentElement! : event.target
    eventElement.classList.remove(...HOVER_DRAG_CSS)
}