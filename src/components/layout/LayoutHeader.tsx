import {Link} from "react-router-dom";
import {ReactNode} from "react";
import chessLogoPng from "../../assets/chess-logo.png"


type Props = {
    children: ReactNode
};

export default function LayoutHeader({ children }: Props) {

    return (
        <div className='w-screen h-screen bg-neutral-800 text-gray-300 py-2'>
            <div className="flex items-center space-x-2 w-full px-2 md:px-4">
                <Link to='/'>
                    <img src={chessLogoPng} alt="logo" className="w-10"/>
                </Link>
                <h1 className="flex-grow mt-0.5 text-3xl tracking-wider font-semibold sm:flex">
                    Chess <span className='hidden sm:block ml-1.5'> Multiplayer</span>
                </h1>

                <h1 className="text-right sm:pr-2">
                    Welcome
                    <br/>
                    {/*<span className='font-semibold'>{userName}</span>*/}
                </h1>
                {/*<UserprofileDropdown user={user}/>*/}
            </div>
            <div className='border-b border-neutral-700 w-full py-1'/>

            { children }
        </div>
    )
}