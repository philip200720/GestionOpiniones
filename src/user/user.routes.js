import { Router } from "express";
import { listValidator, updateUserValidator, getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/user-validator.js";
import { getUserById, getUsers, updateUser, deleteUser, updatePassword } from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", listValidator, getUsers);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user details
 *     description: Updates the details of an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/updateUser", updateUserValidator, updateUser);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes an existing user from the system.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password
 *     description: Updates the password for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password or other error
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

export default router;
