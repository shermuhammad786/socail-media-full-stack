import React, { useEffect, useState } from 'react'
import Navbar from './navabr/Navbar'
import Sidebar from './LeftSide/Sidebar'
import Center from './Center/Center'
import RightBar from './RightBar/RightBar'
import { useNavigate } from "react-router-dom"


export default function HomePage({ userProfilePic }) {

    const navigate = useNavigate();
    useEffect(() => {
        const userInLocal = localStorage.getItem("user")
        if (userInLocal === "false") {
            navigate("/login");
        } else {
            navigate("/home")
        }
    }, [navigate])
    return (
        <>
            <div>
                <Navbar userProfilePic={userProfilePic} />
            </div>
            <div className='flex justify-between mt-8'>
                <div className='w-2/12'>
                    <Sidebar />
                </div>

                <div className='w-2/5'>
                    <Center userProfilePic={userProfilePic} />
                </div>

                <div className='w-4/12'>
                    <RightBar />
                </div>
            </div>
        </>
    )
}
