import React, { useState, useEffect } from 'react';
import BasicTextFields from './Input/BasicTextComponent';
// import ImageAvatars from './Profile/Profile';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { WhatsonMin } from './Profile/Profile';
import { InputFileUpload } from '../inputFileUpload';
import axios from 'axios';

export default function Mind({ userProfilePic }) {
    const [userTextInput, setUserTextInput] = useState('');
    const [postImageUrl, setPostImageUrl] = useState('');

    const PostKrRahaHo = async () => {
        try {
            const postDetails = {
                userId: localStorage.getItem('user'),
                img: postImageUrl,
                desc: userTextInput,
            };
            const post_Posting = await axios.post(`http://localhost:8000/posts/create/post/${localStorage.getItem('user')}`, postDetails);
            if (post_Posting.data.status) {
                alert(post_Posting.data.message);


            } else {
                // Handle the case when the post creation fails
                alert(post_Posting.data.message);
            }
        } catch (error) {
            console.log(error, 'error');
        }
    };

    return (
        <Paper elevation={8}>
            <div className='w-196 flex flex-col items-start gap-10 shadow-lg p-4 rounded text-xs'>
                <div className='flex items-center justify-center gap-8'>
                    <div>
                        <WhatsonMin userProfilePic={userProfilePic} />
                    </div>
                    <div>
                        <BasicTextFields setUserTextInput={setUserTextInput} />
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div>
                        <InputFileUpload setPostImageUrl={setPostImageUrl} />
                    </div>
                    <div>
                        <span className='text-blue-700'>
                            <LabelIcon />{' '}
                        </span>{' '}
                        Tag
                    </div>
                    <div>
                        <span className='text-green-600'>
                            <LocationOnIcon />
                        </span>{' '}
                        Location
                    </div>
                    <div>
                        <span className='text-yellow-500'>
                            <EmojiEmotionsIcon />
                        </span>{' '}
                        Feelings
                    </div>
                    <div className='text-xs'>
                        <Button variant='contained' onClick={PostKrRahaHo}>
                            Share
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    );
}
