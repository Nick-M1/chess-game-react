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


    const [board, isPlayersTurn] = useBoard(gameid, userid, playerColor)

    const kingsPieceId = useMemo(() => playerColor == Colors.BLACK ? 15 : 31, [playerColor])
    const isCheckCondition = useMemo(() => isCheckConditionFunc(kingsPieceId, playerColor, board), [kingsPieceId, playerColor, board])

    const [pieceBeingDragged, setPieceBeingDragged, possibleMoves] = usePieceBeingDragged(board, isCheckCondition, playerColor)
    const [gameoverModalOpen, setGameoverModalOpen] = useGameover(gameid, gameInfo.gameend_timestamp, isCheckCondition)

    useToastPopups(pieceBeingDragged, isPlayersTurn, isCheckCondition != null, gameInfo.gameend_timestamp !== null)



    return (
        <div className='w-screen h-screen bg-neutral-800 text-white p-3'>

            <div className='flex items-center'>
                <img src={unknownProfilePng} alt='profile' title='Player 1 (You)' className='w-8 rounded-full self-center' draggable={false}/>
                <h3 className={`text-left ml-2 ${ isPlayersTurn ? 'text-teal-500' : 'text-neutral-200' }`}>
                    { playerColor === Colors.WHITE ? 'White ' : 'Black ' } Player: <br/> { playerColor === Colors.WHITE ? gameInfo.username_white : gameInfo.username_black }
                </h3>

                <div className='flex-grow'/>

                <h3 className={`text-right mr-2 ${ isPlayersTurn ? 'text-neutral-200' : 'text-teal-500' }`}>
                    { playerColor === Colors.WHITE ? 'Black ' : 'White ' } Player: <br/> { playerColor === Colors.WHITE ? gameInfo.username_black: gameInfo.username_white }
                </h3>
                <img src={unknownProfilePng} alt='profile' title='Player 2' className='w-8 rounded-full self-center' draggable={false}/>
            </div>

            <div className='border-b border-neutral-700 w-full my-2'/>

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