"use strict";

import helmet from "helmet";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";

// Swagger importaciones
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
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
    }));
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // Versión de OpenAPI
    info: {
      title: 'Opinion Management API',  // Título de la API
      version: '1.0.0',  // Versión de la API
      description: 'API documentation for Opinion Management system',  // Descripción de la API
    },
  },
  // Especifica el lugar donde Swagger buscará los comentarios
  apis: ['./src/auth/auth.routes.js', './src/user/user.routes.js'],  // Rutas donde se documentan las API
};

// Generar el especificación de Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const routes = (app) => {
    app.use("/opinionManagement/v1/auth", authRoutes);
    app.use("/opinionManagement/v1/user", userRoutes);

    // Rutas de Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

const connectDB = async() =>{
    try{
        await dbConnection();
    }catch(err){
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
}

export const initServer = () => {
    const app = express();
    try{
        middlewares(app);
        connectDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
            console.log('API documentation available at http://localhost:' + process.env.PORT + '/api-docs');
        });
    }catch(err){
        console.log(`Server init failed: ${err}`);
    }
};
