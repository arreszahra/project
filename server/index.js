import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
/* import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js" */;
import routes from "./routes/index.js"

dotenv.config()

dbConnection()

 const PORT= process.env.PORT || 5000
 const app = express()

 app.use(cors({
    origin: ['http://localhost:3000' , "http://localhost:3001"],
    methods:["GET", "PUT", "DELETE", "POST"],
    credentials: true, 
 }));

 app.use(express.json());
 app.use(express.urlencoded({ extended: true})); //to fix the error of body-parser deprecated

 app.use(cookieParser());
 app.use(morgan("dev")); //only used in development mode
app.use("/api", routes);

/* app.use(routeNotFound());
app.use(errorHandler()); */

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
