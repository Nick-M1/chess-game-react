import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

export default function LayoutMain() {
    return (
        <>
            <Toaster position="bottom-center" reverseOrder={true}/>
            <Outlet/>
        </>
    )
}