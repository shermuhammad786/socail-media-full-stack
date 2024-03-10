import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function LeftBarFriends({ singleUser }) {
    return (
        <div className='flex items-center gap-5'>
            <Stack direction="row" spacing={2}>
                <Avatar alt={singleUser?.username} src={singleUser?.profilePicture} />
            </Stack>
            <div className="flex flex-col">
                <span className="font-medium">{singleUser?.username}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{singleUser.email}</span>
            </div>
        </div>
    )
}
