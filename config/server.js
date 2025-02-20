"use strict"

import helmet from "helmet"
import express from "express"
import cors from "cors"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }))
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

/*
    const routes = (app) => {
    
    }
 */

const connectDB = async() =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        connectDB
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}