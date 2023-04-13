import LayoutHeader from "../../layout/LayoutHeader";
import chessLogoPng from "../../assets/chess-logo.png"
import DisplayGameroomid from "../shared/DisplayGameroomid";

type Props = {
    gameid: string
}

export default function GameLobby({ gameid }: Props) {

    return (
        <LayoutHeader>
            <div className='flex flex-col justify-center items-center space-y-3 px-4 sm:px-8'>
                <img src={chessLogoPng} alt='home-icon' className='max-h-[30vh] w-fit mx-auto py-3'/>

                <h2 className='text-3xl font-bold'>Game Lobby</h2>
                <p className='text-center pb-8 italic'>
                    Please wait for another player to join,
                    <br/>
                    or share the <span className='font-semibold'>Gameroom ID</span> with a friend to play against them.
                </p>

                <DisplayGameroomid gameroomid={gameid} width='30'/>
            </div>
        </LayoutHeader>

    );
}