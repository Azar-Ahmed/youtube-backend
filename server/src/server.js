import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import connectDB from './config/db.config.js'
import userRoutes from './routes/user.route.js'
import errorHandler from './middlewares/error.middleware.js'
dotenv.config() 
connectDB() //Database Connection

const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes)

// Error Handling
app.use(errorHandler);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})