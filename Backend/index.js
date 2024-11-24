import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from './router/user.router.js'
import messageRoute from './router/message.router.js'
import { app, server } from "./SocketIO/server.js";


dotenv.config();

const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL)
    .then(() => console.log('DB connected !'))
    .catch((error) => console.log("Error! ", error))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



// routers
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)


server.listen(PORT, () => {
    console.log(`server is running at port:${PORT}`)
})