import React, { useEffect, useState } from 'react'
import Navbar from '../HomePage/navabr/Navbar'
import Sidebar from '../HomePage/LeftSide/Sidebar'
import Center from '../HomePage/Center/Center'
import ProfilePageRightBar from '../../Components/ProfilePageRightBar'
import axios from "axios";
import { uploadFile } from '../../FireBase/Functions'
import CameraIcon from '@mui/icons-material/Camera';

export default function ProfilePage({ userProfilePic }) {
    const [image, setImage] = useState();

    const imageHandler = async (e) => {
        try {
            const file = e.target.files[0];

            if (file) {
                const profilePictureName = `${new Date().getTime()}-${file.name}`;

                try {
                    const uploadingFile = await uploadFile(file, profilePictureName);
                    if (uploadingFile.status) {
                        const updateImage = {
                            profilePicture: uploadingFile.downloadURL
                        }

                        const updateProfileImage = await axios.put(`http://localhost:8000/auth/update/${localStorage.getItem("user")}`,
                            updateImage,
                            { new: true }
                        );

                    }
                } catch (error) {
                    console.error("Error uploading file:", error.message);
                }
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='flex justify-between'>
                <div className='w-4/12'>
                    <Sidebar />
                </div>

                <div>
                    <div>
                        <div className='h-96 relative rounded' style={{ backgroundImage: `url(../assests/post4.jpeg)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                            <div style={{ bottom: "-15%", left: "40%", width: "200px" }} className='absolute h-52'>
                                <img className='h-full' width={"100%"} src={userProfilePic?.profilePicture === "" ? "assests/userProfile.png" : userProfilePic?.profilePicture} alt="" style={{ borderRadius: "50%" }} />
                                <label htmlFor="profileImage" className='cursor-pointer absolute bottom-4 right-2 text-3xl'><CameraIcon style={{ fontSize: "40px" }} /></label>
                                <input type="file" accept="image/*" id='profileImage' className='hidden' onChange={imageHandler} />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-around mt-32'>
                        <div className='w-2/5'>
                            <Center userProfilePic={userProfilePic} />
                        </div>

                        <div className='w-4/12'>
                            <ProfilePageRightBar />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
