import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        postUser: {
            type: Array,
        },
        userID: {
            type: String,
            require: true
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);


const postSchema = mongoose.model("Posts", UserSchema);

export { postSchema };
