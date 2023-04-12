import {useEffect, useState} from "react";
import {createBoard, findPieceByIdAndReplaceWithDefaultCell} from "../logic/board-util";
import {supabase} from "../supabase_setup";
import {Colors} from "../constants/pieces-constants";

type QueryResponseType = {
    PieceId: number,
    PieceName: number,
    PieceColor: number,
    PositionY: number,
    PositionX: number,
    isPieceAlive: boolean
    UserId: string | null
}

export default function useBoard(gameid: string, userId: string, playerColor: Colors | null) {

    // Initialise empty board
    const [board, setBoard] = useState(createBoard())

    // Initialise is this player's turn
    const [isPlayersTurn, setIsPlayersTurn] = useState(false)

    // Initialise filled board with pieces, from DB
    useEffect(() => {
        const getAllRecentMovesAndBuildBoard = async () => {
            const {data, error}: any = await supabase.rpc('getAllPiecesByLatestMove', { gameid })
            if (error != null) {
                console.log('Error: ', error)
                return
            }

            setBoard(() => {
                const newBoard = createBoard()

                data.forEach(({ PieceId, PieceName, PieceColor, PositionY, PositionX, isPieceAlive }: QueryResponseType) => {
                    if (isPieceAlive)
                        newBoard[PositionY][PositionX] = {PieceId, PieceName, PieceColor, isEmpty: false} as Cell
                })

                return newBoard
            })

            // Get players turn based on first move in db response
            const mostRecentMove = data.at(0) as QueryResponseType
            // if (gameover) {
            //     const isWinner = mostRecentMove.UserId == userId
            //     toast(`GAME OVER\n\n${isWinner ? 'YOU WON!!!' : 'YOU LOST!!!'}`, toastOptionsCustom({ id: 'gameover', icon: isWinner ? '🏆' : '😥', duration: 100_000 }, 'lightgreen'))
            // }

            setIsPlayersTurn(() => {
                if (mostRecentMove.UserId == null)
                    return playerColor === Colors.WHITE
                else
                    return mostRecentMove.UserId !== userId
            })

        }
        getAllRecentMovesAndBuildBoard()
    }, [])


    // Subscribe to new inserts in DB and update board
    useEffect(() => {
        const tblGameMoves = supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'tblGameMoves', filter: `GameId=eq.${gameid}` },
                (payload) => {

                    setBoard(prevState => {

                        const newBoard = [...prevState]
                        const foundPiece = findPieceByIdAndReplaceWithDefaultCell(payload.new.PieceId, prevState)

                        if (foundPiece)
                            newBoard[payload.new.PositionY][payload.new.PositionX] = foundPiece

                        return newBoard
                    })

                    setIsPlayersTurn(payload.new.UserId !== userId)
                }
            ).subscribe()

        return () => {
            tblGameMoves.unsubscribe()
        }
    }, [])

    return [board, isPlayersTurn] as const
}