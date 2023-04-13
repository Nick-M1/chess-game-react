import {LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";
import {Navigate} from "react-router-dom";
import ViewProfile from "../components/profile/ViewProfile";

export function Component() {
    const userid = localStorage.getItem(LOCALSTORAGE_USERID_KEY)

    if (userid == null)
        return <Navigate to='/' replace={true}/>

    return <ViewProfile userid={userid}/>
}