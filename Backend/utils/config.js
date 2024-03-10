import mongoose from "mongoose";
import dotenv from 'dotenv'
const dbConnection = ()=>{

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db connect");
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });
}
export {dbConnection}