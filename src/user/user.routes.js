import { Router } from "express";
import { listValidator, updateUserValidator, getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/user-validator.js"
import { getUserById, getUsers, updateUser, deleteUser, updatePassword } from "./user.controller.js"


const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", listValidator, getUsers)

router.put("/updateUser", updateUserValidator, updateUser)

router.delete("/deleteUser", deleteUserValidator, deleteUser)

router.patch("/updatePassword", updatePasswordValidator, updatePassword)

export default router