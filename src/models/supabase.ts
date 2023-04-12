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
          Gameover: boolean
          GameStartTimestamp: string
          UserIdBlack: string | null
          UserIdWhite: string | null
        }
        Insert: {
          GameEndTimestamp?: string | null
          GameId?: string
          Gameover?: boolean
          GameStartTimestamp?: string
          UserIdBlack?: string | null
          UserIdWhite?: string | null
        }
        Update: {
          GameEndTimestamp?: string | null
          GameId?: string
          Gameover?: boolean
          GameStartTimestamp?: string
          UserIdBlack?: string | null
          UserIdWhite?: string | null
        }
      }
      tblGameMoves: {
        Row: {
          GameId: string | null
          isPieceAlive: boolean
          MoveId: number
          MoveTimestamp: string
          PieceId: number
          PositionX: number
          PositionY: number
          UserId: string | null
        }
        Insert: {
          GameId?: string | null
          isPieceAlive?: boolean
          MoveId?: number
          MoveTimestamp?: string
          PieceId: number
          PositionX: number
          PositionY: number
          UserId?: string | null
        }
        Update: {
          GameId?: string | null
          isPieceAlive?: boolean
          MoveId?: number
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
          Name: string | null
          UserId: string
        }
        Insert: {
          Name?: string | null
          UserId?: string
        }
        Update: {
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
