import { Schema } from "mongoose";
import { postSchema } from "../../Models/schema/postSchema.js";
import { SingUpUserSchema } from "../../Models/schema/authSchema.js";

//CREATE A POST
export const createPost = async (req, res) => {
    try {
        const { desc, img, likes } = req.body
        const userID = req.params._id
        const findUser = await SingUpUserSchema.findById(userID);
        console.log(findUser, "==>>> find user")
        const newPost = new postSchema({
            postUser: findUser,
            userID: userID,
            desc: desc,
            img: img,
            likes: likes
        })
        const savedPost = await newPost.save()
        if (savedPost) {

            res.json({
                status: true,
                message: "Post Created SuccessFully",
                post: savedPost,
            })
        }
        else {
            res.json({
                status: false,
                message: "post not saves"
            })
        }
    } catch (error) {
        console.log(error, "===>>> error")
        res.json({
            status: false,
            message: "Internal Server Error",
            error: error.message

        })
    }
}

//UPDATE A POST
export const updatePost = async (req, res) => {
    try {
        const { desc, img } = req.body;
        const _id = req.params._id;

        const postOwner = await postSchema.findById(_id);
        // console.log(postOwner, "=====>>>  postOwner")
        // console.log(postOwner.userID, "===>>>>  post Owner user id")
        const postOwnerDetails = await SingUpUserSchema.findById(postOwner?.userID);
        // console.log(postOwnerDetails , "===>>> post owner Details")


        const updatedPost = await postSchema.findByIdAndUpdate(_id, {
            desc: `${postOwnerDetails?.username} ${desc}`,
            img: `${postOwnerDetails?.username} ${img}`,
        }, { new: true });

        if (updatedPost) {
            res.json({
                status: true,
                message: "Post has been updated successfully",
                updatedPost: updatedPost
            });
        } else {
            res.json({
                status: false,
                message: "Post not updated",
            });
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

//DELETE A POST
export const deletePost = async (req, res) => {

    try {

        const deletePostId = req.params._id;
        const deletePost = await postSchema.findByIdAndDelete(deletePostId);
        if (deletePost) {
            res.json({
                status: true,
                message: "Post Deleted Successfully",
                deletedpost: deletePost
            })
        } else {
            res.json({
                status: false,
                message: "Post was not deleted"
            })
        }

    } catch (error) {
        res.json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }

}

//LIKE A POST
export const likePost = async (req, res) => {

    try {

        const postID = req.params._id
        const { likerID } = req.body

        const jisKoLikeKiya = await postSchema.findById(postID)
        // const jisKoLikeKiyaDetail = await SingUpUserSchema.findById(jisKoLikeKiya.userID);

        const jisNeLikeKiya = await postSchema.findById(likerID);
        // const jisNeLikeKiyaDetail = await SingUpUserSchema.findById(jisNeLikeKiya.userID);

        if (!jisKoLikeKiya.likes.includes(likerID)) {
            const likedPost = await jisKoLikeKiya.updateOne({ $push: { likes: likerID } })
            res.json({
                status: true,
                message: `you like the post of`,
                likedPost: likedPost,
                likeLength: jisKoLikeKiya?.likes,
            })

        } else {
            const unlikePost = await jisKoLikeKiya.updateOne({ $pull: { likes: likerID } })
            res.json({
                status: false,
                message: `you un liked the post of `,
                unlikePost: unlikePost,
                likeLength: jisKoLikeKiya?.likes,
            })
        }

    } catch (error) {
        res.json({
            status: false,
            message: "Internel Server Error",
            error: error.message
        })
    }
}

//GET A POST
export const getPost = async (req, res) => {
    try {

        const postID = req.params._id;
        const singlePost = await postSchema.findById(postID);
        if (singlePost) {
            res.json({
                status: true,
                message: "post gettted successfully",
                singlePost: singlePost
            })
        } else {
            res.json({
                status: false,
                message: "post not get"
            })
        }

    } catch (error) {
        res.json({
            status: false,
            message: "Inertnal Server Error",
            error: error.message
        })
    }
}

//GET ALL POSTS OF A USER  OR GET TIMELINE POSTS
export const getPosts = async (req, res) => {
    try {
        // Find the current user by their ID
        const currentUser = await SingUpUserSchema.findById(req.body.userID);

        if (!currentUser) {
            return res.json({
                status: false,
                message: "User not found",
            });
        }

        // Find posts associated with the current user
        const postsCurrentUser = await postSchema.find({ userID: currentUser._id });
        // Find the followings friends 
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendID => {
                return postSchema.find({ userID: friendID })
            })
        );

        if (postsCurrentUser) {
            res.json({
                status: true,
                message: "These are the posts of the user",
                allPosts: (postsCurrentUser.concat(...friendPosts)),
            });
        } else {
            res.json({
                status: true,
                message: "No posts found for the user",
                allPosts: [],
            });
        }
    } catch (error) {
        console.error(error);
        res.json({
            status: false,
            message: "Internal Server Error",
            message: error.message
        });
    }
};

// GET ALL USERS POSTS
export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await postSchema.find()
        res.json({
            status: true,
            message: "getting all posts successfull",
            allPosts: allPosts
        })
    } catch (error) {
        res.json({
            status: false,
            message: "internal server error",
            error: error.message
        })

    }
}