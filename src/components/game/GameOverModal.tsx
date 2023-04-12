import ModalCustom from "../shared/ModalCustom";
import {Dispatch, SetStateAction} from "react";
import unknownProfilePng from "../../assets/unknown-profilepic.png"
import {Colors} from "../../constants/pieces-constants";
import {Link} from "react-router-dom";


type Props = {
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>

    gameInfo: GameInfoType
    isWinner: boolean
    playerColor: Colors
}

export default function GameOverModal({ modalOpen, setModalOpen, gameInfo, isWinner, playerColor }: Props) {

    return (
        <ModalCustom title='GAME OVER!' modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='flex items-center pt-6 pb-1'>
                <img src={unknownProfilePng} alt='profile' title='Player 1 (You)' className='w-8 rounded-full self-center' draggable={false}/>
                <h3 className='text-left ml-2 text-neutral-400'>
                    <span className='italic text-neutral-200'>{ playerColor === Colors.WHITE ? 'White ' : 'Black ' } Player </span>
                    <br/> { playerColor === Colors.WHITE ? gameInfo.username_white : gameInfo.username_black }
                </h3>

                <div className='flex-grow'/>

                <h3 className='text-right mr-2 text-neutral-400'>
                    <span className='italic text-neutral-200'>{ playerColor === Colors.WHITE ? 'Black ' : 'White ' } Player </span>
                    <br/> { playerColor === Colors.WHITE ? gameInfo.username_black: gameInfo.username_white }
                </h3>
                <img src={unknownProfilePng} alt='profile' title='Player 2' className='w-8 rounded-full self-center' draggable={false}/>
            </div>

            <div className='flex justify-between text-white font-bold'>
                <h3 className={`${isWinner ? 'order-1' : 'order-last'}`}>WINNER 🏆</h3>
                <h3>LOSER 😢</h3>
            </div>

            <div className='pt-10 pb-5 text-white flex justify-center'>
                <Link to='/' className='btn-3d-green'>
                    Main Menu
                </Link>

            </div>
        </ModalCustom>
    );
}