import React, { useCallback, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { uploadFile } from '../FireBase/Functions';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    // fontSize: 1
});

export function InputFileUpload({ setPostImageUrl }) {




    const PostImageHandler = async (e) => {
        try {
            const file = e.target.files[0];

            if (file) {
                const profilePictureName = `${new Date().getTime()}-${file.name}`;

                try {
                    const uploadingFile = await uploadFile(file, profilePictureName);
                    if (uploadingFile.status) {
                        setPostImageUrl(uploadingFile.downloadURL)
                    }
                } catch (error) {
                    console.error("Error uploading file:", error.message);
                }
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    }













    return (
        <Button
            style={{
                // border: "2px solid red",
                fontSize: "10px",
                padding: "0px",
                color: "black",
                textAlign: "center",
                width: "100px"
            }}
            className='text-sm'
            component="label"
            role={undefined}
            // variant="contained"
            tabIndex={-1}
            startIcon={<PhotoLibraryIcon className='text-red-500' />}
        >
            Photos or Videos
            <VisuallyHiddenInput type="file" onChange={PostImageHandler} />
        </Button>
    );
}