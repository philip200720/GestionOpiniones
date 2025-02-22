import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const exists = await User.findOne({email})
    if(exists){
        throw new Error(`The email ${email} already exists`)
    }
}

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({username})
    if(exists){
        throw new Error(`The username ${username} already exists`)
    }
}

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("User with the given ID does not exist")
    }
}

export const userIsDeleted = async (uid = "") => {
    const user = await User.findById(uid)
    if(user.status === false){
        throw new Error("User with the given ID already deleted")
    }
}