import {createNewUser} from "../../database/create-new-user";
import {useNavigate} from "react-router-dom";
import chessLogoPng from "../../assets/chess-logo.png";
import LayoutHeader from "../../layout/LayoutHeader";

export default function CreateAccount() {
    const navigate = useNavigate()

    const createAccountHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()

        const displayname = formData.get('display-name')

        if (displayname == null || displayname == '')
            return

        createNewUser(String(displayname))
            .then(() => navigate(0))
    }

    return (
        <LayoutHeader>
            <div className='text-white flex flex-col justify-center items-center space-y-12'>
                <img src={chessLogoPng} alt='home-icon' className='max-h-[30vh] w-fit mx-auto py-3'/>

                <form onSubmit={createAccountHandler} className='w-full max-w-xl bg-white/10 rounded-lg mx-8 md:mx-8 px-4 py-3 my-5 outline outline-2 outline-gray-700 focus-within:outline-indigo-900 shadow-3xl smooth-transition'>
                    <label htmlFor='display-name' className='text-xl tracking-wide font-semibold'>Enter Display Name:</label>

                    <div className='flex space-x-2 my-2'>
                        <input id='display-name' name='display-name' type='text' placeholder='Display name...' className='input-primary'/>
                        <button className='btn-primary bg-white/10 hover:bg-white/20 focus:bg-white/30 mt-1'>Create Account</button>
                    </div>

                </form>
            </div>
        </LayoutHeader>
    );
}