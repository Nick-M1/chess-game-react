import LayoutHeader from "../../layout/LayoutHeader";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import NavButtonRight from "../shared/NavButtonRight";
import React, {useState} from "react";
import {supabase} from "../../supabase_setup";
import toast from "react-hot-toast";
import {defaultProfileImage, getAllProfileImages, profileImgsMapper} from "../../constants/profile-imgs-constants";
import ImagesSelect from "./ImagesSelect";

type Props = {
    userid: string
    userDB: PostgrestSingleResponse<{Image: string | null, Name: string | null, UserId: string}>
}

export default function ViewProfile({ userid, userDB }: Props) {
    const [selectedProfileImage, setSelectedProfileImage] = useState(userDB.data?.Image != null ? [userDB.data.Image, profileImgsMapper(userDB.data?.Image)] : ['default', defaultProfileImage])

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

    return (
        <LayoutHeader>
            <div className='relative'>
                <NavButtonRight text='MAIN MENU' to='/' className='text-teal-500 hover:text-teal-600 active:text-teal-800 smooth-transition'/>
                <h1 className='text-center py-12 text-4xl font-bold tracking-widest '>PROFILE</h1>

                <form onSubmit={changeNameHandler} className='w-full max-w-xl smooth-transition bg-white/10 my-7 py-3 px-6 rounded-lg shadow-xl drop-shadow-2xl mx-auto'>
                    <label htmlFor='displayname' className='text-xl tracking-wide font-semibold'>Change Display Name</label>

                    <div className='flex space-x-2 my-1.5'>
                        <input id='displayname' name='displayname' type='text' placeholder='Display name...' className='input-primary py-3' defaultValue={userDB.data?.Name || ''}/>
                        <button className='btn-3d-blue mb-3 mt-0.5 py-0'>Update</button>
                    </div>
                </form>

                <form onSubmit={changeProfileImageHandler} className='w-full max-w-xl smooth-transition bg-white/10 my-7 py-3 px-6 rounded-lg shadow-xl drop-shadow-2xl mx-auto'>
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
        </LayoutHeader>
    );
}