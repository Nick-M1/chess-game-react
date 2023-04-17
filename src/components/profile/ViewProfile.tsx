import LayoutHeader from "../../layout/LayoutHeader";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import NavButtonRight from "../shared/NavButtonRight";
import React, {useState} from "react";
import {supabase} from "../../supabase_setup";
import toast from "react-hot-toast";
import {defaultProfileImage, getAllProfileImages, profileImgsMapper} from "../../constants/profile-imgs-constants";
import ImagesSelect from "./ImagesSelect";
import {LOCALSTORAGE_BOARD_THEME} from "../../constants/board-constants";
import {defaultTheme, THEME_BROWN, THEME_GREEN, themeMapper} from "../../constants/themes-board";

type Props = {
    userid: string
    userDB: PostgrestSingleResponse<{Image: string | null, Name: string | null, UserId: string}>
}

export default function ViewProfile({ userid, userDB }: Props) {
    const [selectedProfileImage, setSelectedProfileImage] = useState<[string, string]>(userDB.data?.Image != null ? [userDB.data.Image, profileImgsMapper(userDB.data?.Image)] : ['default', defaultProfileImage])
    const [selectedTheme, setSelectedTheme] = useState( localStorage.getItem(LOCALSTORAGE_BOARD_THEME) || defaultTheme )

    const changeNameHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()

        toast.loading('Updating name...', { id: 'displayname', position: 'top-center' })

        const displayname = formData.get('displayname') as string | null
        if (displayname == null || displayname == '') {
            toast.error("Display name can't be empty. Please change", { id: 'displayname' })
            return
        }
        if (displayname == userDB.data?.Name) {
            toast.error("Display name entered is the same as the current display name", { id: 'displayname' })
            return
        }

        const { data, error} = await supabase
            .from('tblUsers')
            .update({Name: displayname})
            .eq('UserId', userid)

        error == null
            ? toast.success('Name updated successfully', { id: 'displayname' })
            : toast.error('Name not updated successfully', { id: 'displayname' })
    }

    const changeProfileImageHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        toast.loading('Updating profile picture...', { id: 'profileimage', position: 'top-center' })

        if (selectedProfileImage[1] === defaultProfileImage) {
            toast.error("Please select a profile picture", { id: 'profileimage' })
            return
        }

        const { data, error} = await supabase
            .from('tblUsers')
            .update({ Image: selectedProfileImage[0] })
            .eq('UserId', userid)

        error == null
            ? toast.success('Profile picture updated successfully', { id: 'profileimage' })
            : toast.error('Profile picture not updated successfully', { id: 'profileimage' })
    }

    const changeThemeHandler = () => {
        setSelectedTheme(prevState => {
            const newTheme = prevState == 'green' ? 'brown' : 'green'
            localStorage.setItem(LOCALSTORAGE_BOARD_THEME, newTheme)

            return newTheme
        })
    }

    return (
        <LayoutHeader>
            <div className='relative'>
                <NavButtonRight text='MAIN MENU' to='/' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                <h1 className='text-center pt-20 pb-7 text-4xl font-bold tracking-widest '>PROFILE</h1>

                <div className='px-3 flex justify-center'>
                    <div className='bg-white/10 py-5 px-6 rounded-lg shadow-xl drop-shadow-2xl flex items-center'>
                        <label className='text-xl tracking-wide font-semibold mr-5'>Change Board Theme</label>
                        <button onClick={changeThemeHandler} className='w-16 h-8 rounded-full bg-white/30 flex items-center transition duration-300 focus:outline-none shadow'>
                            <div className={`${selectedTheme == 'green' ? 'bg-darkgreen' : 'bg-darkbrown translate-x-8'} w-10 h-10 relative rounded-full transition duration-500 transform -translate-x-2 p-1 text-white`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                            </div>
                        </button>
                    </div>
                </div>

                <div className='px-3'>
                    <form onSubmit={changeNameHandler} className='w-full max-w-xl smooth-transition bg-white/10 my-4 py-3 px-6 rounded-lg shadow-xl drop-shadow-2xl mx-auto'>
                        <label htmlFor='displayname' className='text-xl tracking-wide font-semibold'>Change Display Name</label>

                        <div className='flex space-x-2 my-1.5'>
                            <input id='displayname' name='displayname' type='text' placeholder='Display name...' className='input-primary py-3' defaultValue={userDB.data?.Name || ''}/>
                            <button className='btn-3d-blue mb-3 mt-0.5 py-0'>Update</button>
                        </div>
                    </form>
                </div>

                <div className='px-3'>
                    <form onSubmit={changeProfileImageHandler} className='w-full max-w-xl smooth-transition bg-white/10 my-4 py-3 px-6 rounded-lg shadow-xl drop-shadow-2xl mx-auto'>
                        <label htmlFor='displayname' className='text-xl tracking-wide font-semibold'>Change Profile Image</label>

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

                            <button className='btn-3d-blue py-[6px] mb-1'>Update</button>
                        </div>
                    </form>
                </div>

            </div>
        </LayoutHeader>
    );
}