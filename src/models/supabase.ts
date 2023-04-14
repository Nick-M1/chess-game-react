export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tblChessGames: {
        Row: {
          GameEndTimestamp: string | null
          GameId: string
          GameStartTimestamp: string
          UserIdBlack: string | null
          UserIdWhite: string | null
          WinnerId: string | null
        }
        Insert: {
          GameEndTimestamp?: string | null
          GameId?: string
          GameStartTimestamp?: string
          UserIdBlack?: string | null
          UserIdWhite?: string | null
          WinnerId?: string | null
        }
        Update: {
          GameEndTimestamp?: string | null
          GameId?: string
          GameStartTimestamp?: string
          UserIdBlack?: string | null
          UserIdWhite?: string | null
          WinnerId?: string | null
        }
      }
      tblGameMoves: {
        Row: {
          GameId: string | null
          isPieceAlive: boolean
          isPromotedPawn: boolean
          MoveId: number
          MoveText: string | null
          MoveTimestamp: string
          PieceId: number
          PositionX: number
          PositionY: number
          UserId: string | null
        }
        Insert: {
          GameId?: string | null
          isPieceAlive?: boolean
          isPromotedPawn?: boolean
          MoveId?: number
          MoveText?: string | null
          MoveTimestamp?: string
          PieceId: number
          PositionX: number
          PositionY: number
          UserId?: string | null
        }
        Update: {
          GameId?: string | null
          isPieceAlive?: boolean
          isPromotedPawn?: boolean
          MoveId?: number
          MoveText?: string | null
          MoveTimestamp?: string
          PieceId?: number
          PositionX?: number
          PositionY?: number
          UserId?: string | null
        }
      }
      tblPieces: {
        Row: {
          PieceColor: number
          PieceId: number
          PieceName: number
        }
        Insert: {
          PieceColor: number
          PieceId?: number
          PieceName: number
        }
        Update: {
          PieceColor?: number
          PieceId?: number
          PieceName?: number
        }
      }
      tblUsers: {
        Row: {
          Image: string | null
          Name: string | null
          UserId: string
        }
        Insert: {
          Image?: string | null
          Name?: string | null
          UserId?: string
        }
        Update: {
          Image?: string | null
          Name?: string | null
          UserId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      createNewGame: {
        Args: {
          gameid: string
        }
        Returns: undefined
      }
      getAllGamesByUser: {
        Args: {
          userid: string
        }
        Returns: Record<string, unknown>[]
      }
      getAllPiecesByLatestMove: {
        Args: {
          gameid: string
        }
        Returns: Record<string, unknown>[]
      }
      getGameInfo: {
        Args: {
          gameid: string
        }
        Returns: Record<string, unknown>
      }
      setGameover: {
        Args: {
          gameid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      piececolors: "WHITE" | "BLACK"
      piecenames: "PAWN" | "BISHOP" | "KNIGHT" | "ROOK" | "QUEEN" | "KING"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
