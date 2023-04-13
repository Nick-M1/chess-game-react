import {useEffect, useState} from "react";
import {createBoard, findPieceByIdAndReplaceWithDefaultCell} from "../logic/board-util";
import {supabase} from "../supabase_setup";
import {ChessPieces, Colors} from "../constants/pieces-constants";

type QueryResponseType = {
    PieceId: number,
    PieceName: number,
    PieceColor: number,
    PositionY: number,
    PositionX: number,
    isPieceAlive: boolean
    UserId: string | null
    MoveText: string | null
    isPromotedPawn: boolean
}

export default function useBoard(gameid: string, userId: string, playerColor: Colors | null) {

    // Initialise empty board
    const [board, setBoard] = useState(createBoard())

    // Store all moves
    const [movesText, setMovesText] = useState<string[]>([])
    const movesTextPushRight = (newText: string) => setMovesText(prevState => [...prevState, newText] )
    const movesTextPushLeft  = (newText: string) => setMovesText(prevState => [newText, ...prevState] )


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
                data.forEach(({ PieceId, PieceName, PieceColor, PositionY, PositionX, isPieceAlive, isPromotedPawn }: QueryResponseType) => {
                    if (isPieceAlive)
                        newBoard[PositionY][PositionX] =
                            {
                                PieceId,
                                PieceName: isPromotedPawn ? ChessPieces.QUEEN : PieceName,
                                PieceColor, isEmpty: false,
                                isPromotedPawn
                            } as Cell
                })

                return newBoard
            })

            // Get players turn based on first move in db response
            const mostRecentMove = data.at(0) as QueryResponseType
            setIsPlayersTurn(() => {
                if (mostRecentMove.UserId == null)
                    return playerColor === Colors.WHITE
                else
                    return mostRecentMove.UserId !== userId
            })

            // Add all non-null move-text
            setMovesText([])
            data.forEach(({ MoveText }: QueryResponseType) => {
                if (MoveText != null)
                    movesTextPushRight(MoveText)

            })

        }
        getAllRecentMovesAndBuildBoard()
    }, [])


    // Subscribe to new inserts in DB and update board
    useEffect(() => {
        const tblGameMoves = supabase.channel('gamemoves-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'tblGameMoves', filter: `GameId=eq.${gameid}` },
                (payload) => {

                    setBoard(prevState => {

                        const newBoard = [...prevState]
                        const foundPiece = findPieceByIdAndReplaceWithDefaultCell(payload.new.PieceId, prevState)

                        if (foundPiece) {
                            if (payload.new.isPromotedPawn) {
                                foundPiece.isPromotedPawn = true
                                foundPiece.PieceName = ChessPieces.QUEEN
                            }
                            newBoard[payload.new.PositionY][payload.new.PositionX] = foundPiece
                        }
                        return newBoard
                    })

                    setIsPlayersTurn(payload.new.UserId !== userId)

                    if (payload.new.MoveText != null)
                        movesTextPushLeft(payload.new.MoveText)
                }
            ).subscribe()

        return () => {
            tblGameMoves.unsubscribe()
        }
    }, [])

    return [board, isPlayersTurn, movesText] as const
}