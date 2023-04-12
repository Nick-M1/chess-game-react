import {supabase} from "../supabase_setup";

export async function createNewGame(userId: string) {
    const { data: dataGame, error: errorGame } = await supabase.from('tblChessGames')
        .upsert({ UserIdWhite: userId })
        .select('GameId')
        .single()

    if (errorGame != null)
        return null

    await supabase.rpc('createNewGame', { gameid: dataGame.GameId })
    return dataGame.GameId
}

export async function joinGame(userId: string, gameid: string) {
    const { error } = await supabase.from('tblChessGames')
        .update({ UserIdBlack: userId })
        .eq('GameId', gameid)

    return error
}