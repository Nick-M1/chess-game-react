import {supabase} from "../supabase_setup";

export async function setGameover(gameid: string) {
    await supabase.rpc('setGameover', {gameid})
}