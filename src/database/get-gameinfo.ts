import {supabase} from "../supabase_setup";

export default async function getGameinfo(gameid: string): Promise<GameInfoType | null> {
    const { data, error } = await supabase
        .rpc('getGameInfo', { gameid: gameid })
        .single()

    if (error != null) {
        console.log(error)
        return null
    }

    return data as GameInfoType
}