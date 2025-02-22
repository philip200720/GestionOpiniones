import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Opinion management API",
            version:"1.0.0",
            description: "Opinion management API",
            contact:{
                name: "Philip Posadas",
                email: "aposadas-2023357@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/opinionManagement/v1/"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }