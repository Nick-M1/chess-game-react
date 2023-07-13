type Coords = [number, number]

type Cell = {
    isEmpty: boolean

    PieceId: number
    PieceName?: import("./src/constants/pieces-constants").ChessPieces
    PieceColor?: import("./src/constants/pieces-constants").Colors
    isPromotedPawn: boolean
}


type Board = Cell[][]

type GameInfoType = {
    gameid: string
    gamestart_timestamp: string
    gameend_timestamp: string

    userid_black: string
    username_black: string
    image_black: string | null

    userid_white: string
    username_white: string
    image_white: string
}

type UserDBType = {
    userid: string
    name: string

    gameid: string
    gamestarttimestamp: string
    gameendtimestamp: string
    useridblack: string | null
    useridwhite: string | null
}

type BoardTheme = {
    light: string
    dark: string
}