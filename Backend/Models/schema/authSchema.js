import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        followers: {
            type: [],
            default: [],
        },
        followings: {
            type: [],
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            maxlength: 50,
        },
        currentCity: {
            type: String,
            maxlength: 50,
        },
        from: {
            type: String,
            maxlength: 50,
        },
        relationship: {
            type: String,
            enum: [1, 2, 3],
        },
    },
    { timestamps: true }
);


const SingUpUserSchema = mongoose.model("Users", UserSchema);

export { SingUpUserSchema };
