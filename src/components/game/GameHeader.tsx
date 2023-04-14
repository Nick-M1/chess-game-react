import TimerComponent from "./TimerComponent";
import useGameHeaderInfo from "../../hooks/useGameHeaderInfo";

type Props = {
    isPlayersTurn: boolean
    showTimer: boolean

    gameHeaderInfo: ReturnType<typeof useGameHeaderInfo>
}

export default function GameHeader({ isPlayersTurn, showTimer, gameHeaderInfo }: Props) {

    return (
        <div className='flex items-center'>
            <img src={gameHeaderInfo.leftPlayerImage} alt='profile' title='Player 1 (You)' className='w-8 rounded-full self-center' draggable={false}/>
            <h3 className={`text-left ml-2 ${ showTimer && isPlayersTurn ? 'text-teal-500' : 'text-neutral-200' }`}>
                { gameHeaderInfo.leftPlayerColor } Player
                <br/>
                <span className='italic opacity-70 '>{ gameHeaderInfo.leftPlayerName }</span>
            </h3>

            { showTimer ? (
                <div className='flex-grow'>
                    <TimerComponent className={ isPlayersTurn ? 'text-teal-500' : 'text-neutral-200'}/>
                </div>
            ) : (
                <div className='flex-grow'/>
            )}

            <h3 className={`text-right mr-2 ${ showTimer && !isPlayersTurn ? 'text-teal-500' : 'text-neutral-200' }`}>
                { gameHeaderInfo.rightPlayerColor } Player
                <br/>
                <span className='italic opacity-70'>{ gameHeaderInfo.rightPlayerName }</span>
            </h3>
            <img src={gameHeaderInfo.rightPlayerImage} alt='profile' title='Player 2' className='w-8 rounded-full self-center' draggable={false}/>
        </div>
    );
}