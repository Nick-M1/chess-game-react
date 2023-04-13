import unknownProfilePng from "../../assets/unknown-profilepic.png";
import {Colors} from "../../constants/pieces-constants";
import TimerComponent from "./TimerComponent";
import {useMemo} from "react";

type Props = {
    isPlayersTurn: boolean
    playerColor: Colors

    blackPlayerUsername: string
    whitePlayerUsername: string
}

export default function GameHeader({ isPlayersTurn, playerColor, blackPlayerUsername, whitePlayerUsername }: Props) {
    const displayOrder = useMemo(() => (
        playerColor === Colors.WHITE
            ? {
                leftPlayerName: whitePlayerUsername,
                leftPlayerColor: 'White',
                rightPlayerName: blackPlayerUsername,
                rightPlayerColor: 'Black'
            } : {
                leftPlayerName: blackPlayerUsername,
                leftPlayerColor: 'Black',
                rightPlayerName: whitePlayerUsername,
                rightPlayerColor: 'White'
            }
    ), [playerColor, blackPlayerUsername, whitePlayerUsername])

    return (
        <>
            <div className='flex items-center'>
                <img src={unknownProfilePng} alt='profile' title='Player 1 (You)' className='w-8 rounded-full self-center' draggable={false}/>
                <h3 className={`text-left ml-2 ${ isPlayersTurn ? 'text-teal-500' : 'text-neutral-200' }`}>
                    { displayOrder.leftPlayerColor } Player
                    <br/>
                    <span className='italic opacity-70 '>{ displayOrder.leftPlayerName }</span>
                </h3>

                <div className='flex-grow'>
                    <TimerComponent className={isPlayersTurn ? 'text-teal-500' : 'text-neutral-200'}/>
                </div>

                <h3 className={`text-right mr-2 ${ isPlayersTurn ? 'text-neutral-200' : 'text-teal-500' }`}>
                    { displayOrder.rightPlayerColor } Player
                    <br/>
                    <span className='italic opacity-70'>{ displayOrder.rightPlayerName }</span>
                </h3>
                <img src={unknownProfilePng} alt='profile' title='Player 2' className='w-8 rounded-full self-center' draggable={false}/>
            </div>

            <div className='border-b border-neutral-700 w-full my-2'/>
        </>
    );
}