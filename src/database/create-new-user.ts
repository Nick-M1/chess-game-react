import {supabase} from "../supabase_setup";
import {LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";

export async function createNewUser(displayName: string, profileimg: string) {
    // store in database
    const { data, error } = await supabase
        .from('tblUsers')
        .upsert({ Name: displayName, Image: profileimg })
        .select()
        .single()

    if (error != null)
        return

    // store userid in localstorage
    window.localStorage.setItem(LOCALSTORAGE_USERID_KEY, data.UserId)
}