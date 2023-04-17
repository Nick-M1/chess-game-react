import {useNavigate} from "react-router-dom";
import {createNewGame, joinGame} from "../../database/create-new-game";
import LayoutHeader from "../../layout/LayoutHeader";
import chessLogoPng from "../../assets/chess-logo.png"
import NavButtonRight from "../shared/NavButtonRight";
import NavButtonLeft from "../shared/NavButtonLeft";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    userId: string
}

export default function CreateGame({ userId }: Props) {
    const navigate = useNavigate()

    const createNewGameHandler = () => {
        toast.loading('Creating a new...', { id: 'create-game', position: 'top-center' })

        createNewGame(userId)
            .then(gameid => {
                if (gameid == null) {
                    toast.error('Failed to create the new game', { id: 'create-game' })
                    return
                }

                toast.success('Game created successfully', { id: 'create-game' })
                navigate(`/game/${gameid}`)
            })
    }

    const joinGameHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()

        toast.loading('Joining the game...', { id: 'join-game', position: 'top-center' })

        const gameid = formData.get('join-game-id')
        if (gameid == null || gameid == '') {
            toast.error('Please input a Game ID to enter that room', { id: 'join-game' })
            return
        }

        joinGame(userId, gameid as string)
            .then((error) => {
                if (error != null) {
                    toast.error('Failed to join game as it either does not exist or is already full', { id: 'join-game' })
                    return
                }

                toast.success('Game joined successfully', { id: 'join-game' })
                navigate(`/game/${gameid}`)
            })
    }

    return (
        <LayoutHeader>
            <div className='relative flex flex-col justify-center items-center space-y-8 px-4 sm:px-8 '>
                <div className='flex pb-6'>
                    <NavButtonLeft text='PROFILE' to='/profile' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                    <NavButtonRight text='PREVIOUS MATCHES' to='/previousmatches' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                </div>

                <img src={chessLogoPng} alt='home-icon' className='max-h-[30vh] w-fit mx-auto py-3 '/>

                <button onClick={createNewGameHandler} className='btn-3d-green'>
                    Create A New Game
                </button>

                <h3>OR</h3>

                <form onSubmit={joinGameHandler} className='w-full max-w-xl smooth-transition bg-white/10 py-3 px-6 rounded-lg shadow-xl drop-shadow-2xl'>
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