import React from 'react'
import Badge from '@mui/material/Badge';
import Profile from "./whatsonMin/Profile/Profile"

export default function OnlineFriends({ singleUser }) {
    return (
        <div className='flex items-center gap-5'>

            <Badge variant='dot' color="success">
                <Profile singleUser={singleUser} />
            </Badge>
            <h1>{singleUser?.username}</h1>
        </div>
    )
}
