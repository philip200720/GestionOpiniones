import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validator.js"


const router = Router()

router.post("/login", loginValidator, login)

router.post("/register", registerValidator, register)

export default router