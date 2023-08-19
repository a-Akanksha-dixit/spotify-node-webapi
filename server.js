import express from "express";
import dotenv from "dotenv";
import 'express-async-errors'
import {errorHandlerMiddleware} from './src/Middlewares/errorHandlerMiddleware.js'
import {notFound} from './src/Middlewares/notFound.js'
import {processResponse} from './src/Services/processResponse.js'
import routes from "./src/Routes/indexRoute.js";
import connectDatabase from './src/Services/databse.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URI

app.use(express.json())

app.use(processResponse)
app.use(routes);
app.use(errorHandlerMiddleware)
app.use(notFound)

const start = async() => {
    try {
        await connectDatabase(mongodbUrl)
        app.listen(PORT, () => {
          console.log(`server is running at ${PORT}`);
        });
      } catch (error) {
        console.log(error);
      }
}

start()

// Authentication:

// POST /api/auth/login: User login using Spotify credentials.
// POST /api/auth/logout: User logout and token invalidation.
// GET /api/auth/me: Get the authenticated user's profile.
