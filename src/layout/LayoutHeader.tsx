import {Link} from "react-router-dom";
import {ReactNode} from "react";
import chessLogoPng from "../assets/chess-logo.png"


type Props = {
    children: ReactNode
};

export default function LayoutHeader({ children }: Props) {

    return (
        <div className='w-screen h-screen bg-neutral-800 text-gray-300'>
            <div className="flex items-center space-x-2 w-full py-3 px-2 md:px-4 bg-neutral-900/5">
                <Link to='/'>
                    <img src={chessLogoPng} alt="logo" className="w-10"/>
                </Link>
                <h1 className="flex-grow mt-0.5 text-3xl tracking-wider font-semibold sm:flex">
                    Chess Multiplayer
                </h1>

                <h1 className="hidden sm:block text-right sm:pr-2">
                    Welcome
                    <br/>
                    {/*<span className='font-semibold'>{userName}</span>*/}
                </h1>
                {/*<UserprofileDropdown user={user}/>*/}
            </div>
            <div className='border-t border-neutral-700 w-full pb-1'/>

            { children }
        </div>
    )
}