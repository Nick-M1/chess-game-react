import {createNewUser} from "../../database/create-new-user";
import {useNavigate} from "react-router-dom";
import chessLogoPng from "../../assets/chess-logo.png";
import LayoutHeader from "../../layout/LayoutHeader";
import React, {useState} from "react";
import {defaultProfileImage, getAllProfileImages, profileImgsMapper} from "../../constants/profile-imgs-constants";
import ImagesSelect from "../profile/ImagesSelect";

export default function CreateAccount() {
    const navigate = useNavigate()
    const [selectedProfileImage, setSelectedProfileImage] = useState<[string, string]>(['default', defaultProfileImage])


    const createAccountHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()

        const displayname = formData.get('display-name') as string | null

        if (displayname == null || displayname == '')
            return

        createNewUser(displayname, selectedProfileImage[0])
            .then(() => navigate(0))
    }

    return (
        <LayoutHeader>
            <div className='text-white'>
                <img src={chessLogoPng} alt='home-icon' className='max-h-[30vh] w-fit mx-auto pt-3'/>

                <form onSubmit={createAccountHandler} className='w-full px-2 pt-3'>
                    <div className='w-full max-w-xl bg-white/10 rounded-lg mx-auto px-4 py-3 outline outline-2 outline-gray-700 focus-within:outline-indigo-900 shadow-3xl smooth-transition'>
                        <label htmlFor='displayname' className='text-xl tracking-wide font-semibold'>Select Profile Image</label>

                        <div className='flex space-x-2 my-1.5 items-center'>
                            <img src={selectedProfileImage[1]} alt={selectedProfileImage[0]} title={selectedProfileImage[0]} className='w-16 mr-2'/>

                            <ImagesSelect
                                allOptions={getAllProfileImages()}
                                anOptionToStringFunc={(option) => option[0]}
                                anOptionToJSXFunc={(option) =>
                                    <div className='flex items-center space-x-2'>
                                        <img src={option[1]} alt={option[0]} className='w-9'/>
                                        <span>{ option[0] }</span>
                                    </div>
                                }
                                selected={selectedProfileImage}
                                setSelected={setSelectedProfileImage}
                            />
                        </div>
                    </div>

                    <div className='w-full max-w-xl bg-white/10 rounded-lg mx-auto px-4 py-3 my-5 outline outline-2 outline-gray-700 focus-within:outline-indigo-900 shadow-3xl smooth-transition'>
                        <label htmlFor='display-name' className='text-xl tracking-wide font-semibold'>Enter Display Name</label>
                        <input id='display-name' name='display-name' type='text' placeholder='Display name...' className='input-primary'/>
                    </div>

                    <div className='w-full flex justify-center'>
                        <button className='btn-3d-blue'>Create Account</button>
                    </div>
                </form>
            </div>
        </LayoutHeader>
    );
}