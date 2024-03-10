import React, { useEffect, useState } from 'react'
import Mind from '../../../Components/whatsonMin/Mind'
import Post from '../../../Components/Post/Post'
import axios from "axios"

export default function Center({ userProfilePic }) {
    const [createPost, setCreatePost] = useState();

    useEffect(() => {
        const gettingData = async () => {
            const response = await axios.get("http://localhost:8000/posts/get/allposts")
            setCreatePost(response.data.allPosts)
        }
        gettingData()
    }, [setCreatePost]
    )

    return (
        <div>
            <div>
                <Mind userProfilePic={userProfilePic} />
            </div>

            <div>
                {createPost?.reverse().map((singlePost, index) => <Post key={index} userProfilePic={userProfilePic} singlePost={singlePost} />)}
            </div>

        </div>
    )
}
