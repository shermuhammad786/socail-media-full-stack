import mongoose from "mongoose";

import { SingUpUserSchema } from "../../Models/schema/authSchema.js";
import bcrypt from "bcrypt";
import express from "express"

// import { status } from "express/lib/response.js";

// USER SINGUP
export const singupController = async (req, res) => {
    try {
        const { username, email, password, desc } = req.body;

        // check if Username is already exists
        const existingUserName = await SingUpUserSchema.findOne({ username: username })
        if (existingUserName) {
            return res.json({
                status: false,
                message: "Username is already exists",
            })
        }


        // Check if the user Email already exists
        const existingUser = await SingUpUserSchema.findOne({ email: email });

        if (existingUser) {
            return res.json({
                status: false,
                message: "Email is  already exists",
            });
        }

        // User does not exist, proceed with signup
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new SingUpUserSchema({
            username: username,
            email: email,
            password: hashedPassword,
            desc: desc,
        });

        const user = await newUser.save();

        res.json({
            status: true,
            message: "Singup Scusseccfully Deiverting You to LoginPage",
            user: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

//LOGIN USER
export const loginHanlder = async (req, res) => {
    try {
        const { password, email } = req.body


        const findingUser = await SingUpUserSchema.findOne({ email: email });
        if (findingUser) {
            const comparePassword = await bcrypt.compare(password, findingUser.password)
            console.log(comparePassword, "===>>> compare passwerod")
            if (comparePassword) {
                res.json({
                    status: true,
                    message: "Logged In Successfully Diverting You to Home Page",
                    user: findingUser
                })
            } else {
                res.json({
                    status: false,
                    message: "Invalid Credentials",
                    user: findingUser
                })

            }
        } else {
            res.json({
                status: false,
                message: "User Not Found",
                user: findingUser
            })
        }

    } catch (error) {
        console.log(error, "error , ==>>> ")
        res.json({
            status: false,
            message: "Internal Server Error",
            error: error.message


        })
    }
}

//  UPDATE USER
export const updateUserController = async (req, res) => {
    try {
        const { username, email, profilePicture, password } = req.body;
        const _id = req.params._id;

        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).json({ status: false, message: 'No file uploaded' });
        // }


        // Ensure that the provided _id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid user ID format",
            });
        }

        const updateUser = {
            email: email,
            username: username,
            profilePicture: profilePicture
        };

        // Check if the password is provided before hashing it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateUser.password = hashedPassword;
        }

        // console.log('_id:', _id);
        // console.log('updateUser:', updateUser);
        const updatedUser = await SingUpUserSchema.findByIdAndUpdate(_id, updateUser,
            { new: true }
        );
        console.log('updatedUser:', updatedUser);



        if (updatedUser) {
            res.json({
                status: true,
                message: "User Updated Successfully",
                user: updatedUser,

            });
        } else {
            res.status(404).json({
                status: false,
                message: "User not found or not updated",
            });
        }
        console.log(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


//  DELETE USER
export const deleteUserController = async (req, res) => {
    try {
        const id = req.params._id;

        const deletedUser = await SingUpUserSchema.findOneAndDelete({ _id: id });

        if (deletedUser) {
            return res.json({
                status: true,
                message: "User Deleted Successfully",
            });
        } else {
            return res.json({
                status: false,
                message: "User Not Deleted",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// get Users
export const getUser = async (req, res) => {
    try {
        const id = req.params._id;
        const getaUser = await SingUpUserSchema.findById(id)

        res.json({
            status: true,
            message: "this is users details",
            user: getaUser
        })
    } catch (error) {
        res.json({
            status: false,
            message: "user not found",
            error: error.message,
        })
    }
}

// FOLLOWINGS

export const followings = async (req, res) => {
    try {
        const id = req.params._id;
        const jisKoFollowKiya = await SingUpUserSchema.findById(id);
        console.log(jisKoFollowKiya, "===>>>> jis ko follow kiya");

        const jisNeFollowKiya = await SingUpUserSchema.findById(req.body.faizId);
        console.log(jisNeFollowKiya, "===>>>> jis ne follow kiya");

        if (id === req.body.faizId) {
            return res.status(400).json({
                status: false,
                message: "You can't follow yourself",
            });
        }

        if (!jisKoFollowKiya.followers.includes(req.body.faizId)) {
            await jisKoFollowKiya.updateOne({ $push: { followers: req.body.faizId } });
            await jisNeFollowKiya.updateOne({ $push: { followings: id } });

            return res.status(200).json({
                status: true,
                user: jisKoFollowKiya,
                message: jisNeFollowKiya.username + " ne follow kiya hai " + jisKoFollowKiya.username,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: jisNeFollowKiya.username + "You already follow " + jisKoFollowKiya.username,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};


// UN FOLLWOINGS
export const unFollowings = async (req, res) => {
    try {
        const id = req.params._id;
        const sher = await SingUpUserSchema.findById(id);
        const faiz = await SingUpUserSchema.findById(req.body.faizId);

        if (id === req.body.faizId) {
            return res.status(400).json({
                status: false,
                message: "You can't un follow yourself",
            });
        }

        if (sher.followers.includes(req.body.faizId)) {
            await sher.updateOne({ $pull: { followers: req.body.faizId } });
            await faiz.updateOne({ $pull: { followings: id } });

            return res.status(200).json({
                status: true,
                user: sher,
                message: "Faiz unfollowed Sher successfully",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "faiz already unfollow Sher",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};
