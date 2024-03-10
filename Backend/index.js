import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { dbConnection } from "./utils/config.js";
import { authRouter } from "./Routes/authRoutes/user.js";
import { postRouter } from "./Routes/postsRouter/posts.js";


dotenv.config()
const app = express();
app.use(cors());

// mongo db connnection
dbConnection()

// middle ware
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

//router
app.use("/auth", authRouter)
app.use("/posts", postRouter)


const port = process.env.PORT;
app.listen(8000, () => {
    console.log("server is running at port ", port)
})