import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton'
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ThreeDots from './threeDots/ThreeDots';
import { PostProfilePic } from '../whatsonMin/Profile/Profile';
import axios from 'axios'

export default function Post({ singlePost, userProfilePic }) {

  const [like, setLike] = useState(true);
  const [isLikes, setIsLikes] = useState(false);
  const [result, setResult] = useState(null);
  const [likeLoader, setLikeLoader] = useState(false);
  const [likeLength, setLikeLength] = useState(singlePost?.likes?.length);


  useEffect(() => {
    if (singlePost?.likes?.includes(localStorage.getItem("user"))) {
      setIsLikes(true);
    } else {
      setIsLikes(false);
    }
  }, [singlePost, setIsLikes]);

  useEffect(() => {

    if (singlePost && singlePost.createdAt) {
      const mongoDbTimestamp = new Date(singlePost.createdAt);
      const timeDifference = Date.now() - mongoDbTimestamp.getTime();

      const formatTimeDifference = (value, unit) => {
        return value > 1 ? `${value} ${unit}s ago` : `${value} ${unit} ago`;
      };

      if (timeDifference < 1000) {
        setResult(formatTimeDifference(timeDifference, 'millisecond'));
      } else if (timeDifference < 60 * 1000) {
        setResult(formatTimeDifference(Math.floor(timeDifference / 1000), 'second'));
      } else if (timeDifference < 60 * 60 * 1000) {
        setResult(formatTimeDifference(Math.floor(timeDifference / (60 * 1000)), 'minute'));
      } else if (timeDifference < 24 * 60 * 60 * 1000) {
        setResult(formatTimeDifference(Math.floor(timeDifference / (60 * 60 * 1000)), 'hour'));
      } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
        setResult(formatTimeDifference(Math.floor(timeDifference / (24 * 60 * 60 * 1000)), 'day'));
      } else {
        setResult(formatTimeDifference(Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000)), 'year'));
      }
    }
  }, [singlePost]);


  const postLikeHandler = async (e) => {
    setLikeLoader(true)


    const likingPost = await axios.put(`http://localhost:8000/posts/like/post/${e}`, { likerID: localStorage.getItem("user") })
    if (likingPost.data.status) {
      setLike(prev => prev = likingPost.data);
      setLikeLength(likingPost.data.likeLength.length);
      setIsLikes(true);
    } else {
      setLike(prev => prev = likingPost.data);
      setLikeLength(likingPost.data.likeLength.length)
      setIsLikes(false);
    }
    setLikeLoader(false)
  };

  return (
    <Paper>
      <div className='mt-10 p-2 w-full'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-7'>
            <PostProfilePic userProfilePic={userProfilePic} singlePost={singlePost} />
            <h2>{singlePost?.postUser[0]?.username}</h2>
            <span>{result}</span>
          </div>
          <ThreeDots />
        </div>

        <div className='m-6'>
          <p>{singlePost?.desc}</p>
        </div>

        <div>
          <div>
            <img width={"100%"} src={singlePost?.img} alt="" />
          </div>
          <div className='flex justify-between mt-4'>
            <div className='m-4'>

              <LoadingButton loading={likeLoader} loadingPosition="start" >
                <Button disabled={likeLoader} onClickCapture={() => postLikeHandler(singlePost._id)} variant="text" >
                  <ThumbUpIcon className={isLikes && (like || like?.likeLength?.includes(localStorage.getItem("user"))) ? "text-blue" : "text-black"} />
                </Button>
              </LoadingButton>
              <span>
                <b>{likeLength}</b>
              </span>
            </div>
            <Button variant="text">
              <CommentIcon className='text-black' />
            </Button>
            <Button variant="text">
              <ShareIcon className='text-black' />
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}
