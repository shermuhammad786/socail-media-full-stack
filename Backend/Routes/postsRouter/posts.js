import express from "express";
import { createPost, deletePost, getAllPosts, getPost, getPosts, likePost, updatePost } from "../../Controller/posts/postsController.js";
const postRouter = express.Router();


//CREATE A POST
postRouter.post("/create/post/:_id", createPost)

//UPDATE A POST
postRouter.put("/update/post/:_id", updatePost)

//DELETE A POST
postRouter.delete("/delete/post/:_id", deletePost)

//LIKE A POST
postRouter.put("/like/post/:_id", likePost)

//GET A POST
postRouter.get("/get/post/:_id", getPost)

//GET ALL POSTS   OR GET TIMELINE POSTS
postRouter.get("/get/posts", getPosts)

//GET ALL POSTS
postRouter.get("/get/allposts", getAllPosts);


export { postRouter }