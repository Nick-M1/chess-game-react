import ModalCustom from "../shared/ModalCustom";
import {Dispatch, SetStateAction} from "react";
import {Link} from "react-router-dom";
import GameHeader from "./GameHeader";
import useGameHeaderInfo from "../../hooks/useGameHeaderInfo";


type Props = {
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>

    gameHeaderInfo: ReturnType<typeof useGameHeaderInfo>
    isWinner: boolean
}

export default function GameOverModal({ modalOpen, setModalOpen, gameHeaderInfo, isWinner }: Props) {

    return (
        <ModalCustom title='CHECKMATE' modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='py-4'>
                <GameHeader isPlayersTurn={false} showTimer={false} gameHeaderInfo={gameHeaderInfo}/>
            </div>
            <div className='flex justify-between text-white font-bold'>
                <h3 className={`text-teal-600 ${ isWinner ? 'order-first' : 'order-last' }`}>WINNER 🏆</h3>
                <h3 className='text-red-500'>LOSER 😢</h3>
            </div>

            <div className='pt-10 pb-5 text-white flex justify-center'>
                <Link to='/' className='btn-3d-green'>
                    Main Menu
                </Link>

            </div>
        </ModalCustom>
    );
}