import {LOCALSTORAGE_USERID_KEY} from "../constants/board-constants";
import CreateAccount from "../components/setup/CreateAccount";
import CreateGame from "../components/setup/CreateGame";

export function Component() {
    const userId = localStorage.getItem(LOCALSTORAGE_USERID_KEY)

    if (userId == null)
        return <CreateAccount/>

    return <CreateGame userId={userId}/>
}