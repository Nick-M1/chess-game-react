import {LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";
import {Navigate, useLoaderData} from "react-router-dom";
import {supabase} from "../supabase_setup";
import ViewPreviousMatches from "../components/previous-matches/ViewPreviousMatches";

export async function loader() {
    const userid = localStorage.getItem(LOCALSTORAGE_USERID_KEY)

    const userDB = userid == null
        ? null
        : await supabase.rpc('getAllGamesByUser', { userid })

    return { userid, userDB }
}

export function Component() {
    const { userid, userDB } = useLoaderData() as Awaited<ReturnType<typeof loader>>

    if (userid == null || userDB == null)
        return <Navigate to='/' replace={true}/>

    return <ViewPreviousMatches userid={userid} userDB={userDB.data as UserDBType[]} />
}