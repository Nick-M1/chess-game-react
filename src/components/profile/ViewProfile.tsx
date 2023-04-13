import {useEffect, useState} from "react";
import {supabase} from "../../supabase_setup";
import LayoutHeader from "../layout/LayoutHeader";
import NavButtonLeft from "../shared/NavButtonLeft";
import {Link} from "react-router-dom";

type Props = {
    userid: string
}

type Response = {
    UserId: string
    Name: string

    GameId: string
    GameStartTimestamp: string
    GameEndTimestamp: string
    UserIdBlack: string | null
    UserIdWhite: string | null
}

export default function ViewProfile({ userid }: Props) {

    // todo: Put into custom-hook
    const [gamesInfo, setGamesInfo] = useState<Response[]>()

    useEffect(() => () => {
        supabase.rpc('getAllGamesByUser', { userid })
            .then(res => setGamesInfo(res.data as Response[]))
    }, [])

    return (
        <LayoutHeader>
            <div className='relative'>
                <NavButtonLeft text='MAIN MENU' to='/' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                <h1 className='text-center py-12 text-4xl font-bold tracking-widest '>PROFILE</h1>

                <div className='overflow-y-auto max-h-[67dvh] scrollbar px-2 md:px-32'>
                    <table className='w-full text-left'>
                        <thead className='text-neutral-300'>
                        <tr>
                            <th>GAME ID</th>
                            <th>DATE</th>
                            <th>PLAYER COLOR</th>
                        </tr>
                        </thead>
                        <tbody className='text-sm'>
                        { gamesInfo?.map(game => (
                            <tr key={game.GameId} className='text-neutral-500 hover:text-neutral-600 smooth-transition'>
                                <td className=' line-clamp-1 w-32 my-0.5'>
                                    <Link to={`/game/${game.GameId}`}>{ game.GameId }</Link>
                                </td>
                                <td>{ game.GameStartTimestamp.split('T')[0] }</td>
                                <td>{ userid === game.UserIdBlack ? 'Black' : 'White' }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutHeader>
    );
}