import {useNavigate} from "react-router-dom";
import {createNewGame, joinGame} from "../../database/create-new-game";
import LayoutHeader from "../layout/LayoutHeader";
import chessLogoPng from "../../assets/chess-logo.png"

type Props = {
    userId: string
}

export default function CreateGame({ userId }: Props) {
    const navigate = useNavigate()

    const createNewGameHandler = () => {
        createNewGame(userId)
            .then(gameid => {
                if (gameid)
                    navigate(`/game/${gameid}`)
            })
    }

    const joinGameHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()

        const gameid = formData.get('join-game-id')
        if (gameid == null || gameid == '')
            return

        // todo: Give user feedback with react toast: e.g if game is full or not even created yet
        joinGame(userId, gameid as string)
            .then((error) => {
                if (error == null)
                    navigate(`/game/${gameid}`)
            })
    }

    return (
        <LayoutHeader>
            <div className='flex flex-col justify-center items-center space-y-8 px-4 sm:px-8'>
                <img src={chessLogoPng} alt='home-icon' className='max-h-[30vh] w-fit mx-auto py-3'/>

                <button onClick={createNewGameHandler} className='btn-3d-green'>
                    Create A New Game
                </button>

                <h3>OR</h3>

                <form onSubmit={joinGameHandler} className='w-full max-w-xl smooth-transition'>
                    <label htmlFor='join-game-id' className='text-xl tracking-wide font-semibold'>Join a game</label>

                    <div className='flex space-x-2 my-1.5'>
                        <input id='join-game-id' name='join-game-id' type='text' placeholder='Game ID...' className='input-primary py-3'/>
                        <button className='btn-3d-blue mb-3 mt-0.5 py-0'>Join</button>
                    </div>

                </form>
            </div>
        </LayoutHeader>

    );
}