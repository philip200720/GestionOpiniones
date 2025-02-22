import { body } from "express-validator"
import { validateJWT } from "./validate-jwt"
import { hasRoles } from "./validate-roles"
import { validateFields } from "./validate-fields"
import { handleErrors } from "./handleErrors"
import { normalizeName } from "./normalize"

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    normalizeName,
    validateFields,
    handleErrors
]

