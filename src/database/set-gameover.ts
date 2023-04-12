import {supabase} from "../supabase_setup";

export async function setGameover(gameid: string) {
    await supabase.rpc('setGameover', {gameid})

    await supabase.from('tblChessGames')
        .update({ Gameover: true })
        .eq('GameId', gameid)
}