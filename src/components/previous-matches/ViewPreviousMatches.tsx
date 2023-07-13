import LayoutHeader from "../../layout/LayoutHeader";
import NavButtonLeft from "../shared/NavButtonLeft";
import {Link} from "react-router-dom";

type Props = {
    userid: string
    userDB: UserDBType[]
}

export default function ViewPreviousMatches({ userid, userDB }: Props) {

    return (
        <LayoutHeader>
            <div className='relative'>
                <NavButtonLeft text='MAIN MENU' to='/' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                <h1 className='text-center pt-20 pb-12 text-4xl font-bold tracking-widest '>PREVIOUS MATCHES</h1>

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
                        { userDB.map(game => (
                            <tr key={game.gameid} className='text-neutral-500 hover:text-neutral-600 smooth-transition'>
                                <td className=' line-clamp-1 w-32 my-0.5'>
                                    <Link to={`/game/${game.gameid}`}>{ game.gameid }</Link>
                                </td>
                                <td>{ game.gamestarttimestamp.split('T')[0] }</td>
                                <td>{ userid === game.useridblack ? 'Black' : 'White' }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutHeader>
    );
}