import PieceComponent from "./PieceComponent";
import useBoard from "../../hooks/useBoard";
import usePieceBeingDragged from "../../hooks/usePieceBeingDragged";
import {useEffect, useMemo, useState} from "react";
import {Colors} from "../../constants/pieces-constants";
import {Navigate} from "react-router-dom";
import {getPlayerColorFromGameInfo} from "../../logic/player-util";
import unknownProfilePng from "../../assets/unknown-profilepic.png"
import useToastPopups from "../../hooks/useToastPopups";
import {findPieceById} from "../../logic/board-util";
import {getPossibleMoves, kingPossibleMoves} from "../../logic/possible-moves";
import {setGameover} from "../../database/set-gameover";
import GameOverModal from "./GameOverModal";
import useGameover from "../../hooks/useGameover";
import useTimer from "../../hooks/useTimer";
import {ROUND_SECONDS} from "../../constants/board-constants";
import TimerComponent from "./TimerComponent";
import GameHeader from "./GameHeader";

type Props = {
    gameid: string
    userid: string
    gameInfo: GameInfoType
}

// todo: do another func for checkmate condition (using the same func as used here previously)
function isCheckConditionFunc(kingsPieceId: number, playerColor: Colors, board: Board): Coords[] | null {
    const kingPieceCoords = findPieceById(kingsPieceId, board)
    let kingInCheck = false

    if (kingPieceCoords == null)
        return null

    const possibleKingMoves = kingPossibleMoves(kingPieceCoords[0], kingPieceCoords[1], board, playerColor)

    const allPossibleMoves: Coords[] = []
    board.forEach((row, y_pos) => {
        row.forEach((cell, x_pos) => {
            if (!cell.isEmpty && cell.PieceColor != playerColor) {
                const possibleMoves = getPossibleMoves(y_pos, x_pos, board, cell.PieceName!, cell.PieceColor!)

                if (!kingInCheck)
                    kingInCheck = possibleMoves.some(possibleCoord => possibleCoord[0] === kingPieceCoords[0] && possibleCoord[1] === kingPieceCoords[1])

                allPossibleMoves.push(...possibleMoves)
            }
        })
    })

    if (!kingInCheck)
        return null

    return possibleKingMoves.filter(coord =>
        !allPossibleMoves.some(possibleCoord =>
            possibleCoord[0] === coord[0] && possibleCoord[1] === coord[1]
        )
    )
}

export function GameActive({ gameid, userid, gameInfo }: Props) {
    // todo: put into own hook
    const playerColor = useMemo(() => getPlayerColorFromGameInfo(userid, gameInfo.userid_white, gameInfo.userid_black), [gameInfo])
    if (playerColor == null)
        return <Navigate to='/' replace={true}/>


    const [board, isPlayersTurn, movesText] = useBoard(gameid, userid, playerColor)

    const kingsPieceId = useMemo(() => playerColor == Colors.BLACK ? 15 : 31, [playerColor])
    const isCheckCondition = useMemo(() => isCheckConditionFunc(kingsPieceId, playerColor, board), [kingsPieceId, playerColor, board])

    const [pieceBeingDragged, setPieceBeingDragged, possibleMoves] = usePieceBeingDragged(board, isCheckCondition, playerColor)
    const [gameoverModalOpen, setGameoverModalOpen] = useGameover(gameid, gameInfo.gameend_timestamp, isCheckCondition)

    useToastPopups(pieceBeingDragged, isPlayersTurn, isCheckCondition != null, gameInfo.gameend_timestamp !== null)
    console.log(userid)

    return (
        <div className='w-screen h-screen bg-neutral-800 text-white p-3 overflow-clip tracking-wider'>
            <GameHeader
                isPlayersTurn={isPlayersTurn}
                playerColor={playerColor}
                blackPlayerUsername={gameInfo.username_black}
                whitePlayerUsername={gameInfo.username_white}
            />

            <div className='sm:flex'>
                <div className='grid grid-cols-8 grid-rows-8 md:max-w-[80dvw] max-h-[80dvh] aspect-square border-4 border-black'>

                    { board && board.map((row, y_pos) => (
                        row.map((cell, x_pos) => (
                            <PieceComponent
                                key={`${y_pos}-${x_pos}`}
                                cell={cell}
                                y_pos={y_pos}
                                x_pos={x_pos}
                                canMovePiece={gameInfo.gameend_timestamp == null && isPlayersTurn && cell.PieceColor === playerColor}
                                canMoveHere={gameInfo.gameend_timestamp == null && isCheckCondition != null && cell.PieceId === kingsPieceId ? isCheckCondition.some(([y, x]) => y === y_pos && x === x_pos) : possibleMoves.some(([y, x]) => y === y_pos && x === x_pos)}
                                isCheckCondition={isCheckCondition}
                                kingsPieceId={playerColor == Colors.BLACK ? 15 : 31}
                                gameid={gameid}
                                userid={userid}
                                board={board}
                                pieceBeingDragged={pieceBeingDragged}
                                setPieceBeingDragged={setPieceBeingDragged}
                            />
                    ))))}

                </div>

                <div className='hidden sm:block w-fit px-4 pt-3 mt-3 ml-3 max-h-[80dvh] h-[76dvh] bg-white/10 rounded-lg overflow-y-auto scrollbar'>
                    <h3 className='font-bold'>Moves History:</h3>
                    <div className='border-b border-neutral-600 w-full my-1.5'/>

                    <ol className='italic marker:text-green-500 list-inside list-decimal' reversed>
                        { movesText.map((move, index) => (
                            <li key={`${index}-${move}`} className='pl-1'>
                                <span className='pl-2'>{ move }</span>
                            </li>
                        ))}
                    </ol>
                </div>

            </div>

            <GameOverModal
                modalOpen={gameoverModalOpen}
                setModalOpen={setGameoverModalOpen}
                gameInfo={gameInfo}
                isWinner={!isPlayersTurn}
                playerColor={playerColor}
            />
        </div>
    )
}