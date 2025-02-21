import { Router } from "express";
import { listValidator, updateUserValidator } from "../middlewares/user-validator";
import { getUsers, updateUser } from "./user.controller";


const router = Router()

router.get("/", listValidator, getUsers)

router.put("/updateUser", updateUserValidator, updateUser)

export default router