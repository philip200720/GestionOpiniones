import { hash, verify } from "argon2";
import User from "./user.model.js"

export const getUsers = async (req, res) => {
    try{
        const query = { status: true }

        const users = await User.find(query)

        return res.status(200).json({
            success: true,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error getting users",
            error: err.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await User.findById(uid)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        user
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error getting user",
        error: err.message
      })
    }
}

export const updateUser = async (req, res) => {
    try{
        const { usuario } = req
        const { role } = usuario
        const data = req.body

        if(data.status){
            return res.status(405).json({
                success: false,
                message: "Unable to switch status in update method"
            })
        }

        if(role === "ADMIN_ROLE"){
            if(data.uid){
                const { uid } = data
                const user = await User.findById(uid)
                if(user.role === "ADMIN_ROLE"){
                    return res.status(401).json({
                        success: false,
                        message: "Unable to edit other admins"
                    })
                }else if(user.role === "USER_ROLE"){
                    const user = await User.findByIdAndUpdate(uid, data, { new: true})
                     return res.status(200).json({
                        success: true,
                        message: "User updated successfully",
                        user
                    })
                }
            }
            const uid = usuario._id
            const user = await User.findByIdAndUpdate(uid, data, { new: true})
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            })
        }else if(role === "USER_ROLE"){
            if(data.uid){
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit other users"
                })
            }else if(data.role){
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit roles"
                })
            }
            
            const uid = usuario._id
            const user = await User.findByIdAndUpdate(uid, data, { new: true})

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating users",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { usuario } = req
        const { role } = usuario
        const data = req.body

        if(role === "ADMIN_ROLE"){
            if(data.uid){
                const { uid } = data
                const user = await User.findById(uid)
                if(user.role === "ADMIN_ROLE"){
                    return res.status(401).json({
                        success: false,
                        message: "Unable to delete other admins"
                    })
                }else if(user.role === "USER_ROLE"){
                    const user = await User.findByIdAndUpdate(uid, {status:false}, { new: true})
                     return res.status(200).json({
                        success: true,
                        message: "User deleted successfully",
                        user
                    })
                }
            }
            const user = await User.findByIdAndUpdate(usuario._id, {status:false}, { new: true})
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }else if(role === "USER_ROLE"){
            if(data.uid){
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to delete other users"
                })
            }
            const user = await User.findByIdAndUpdate(usuario.uid, {status: false}, {new: true})

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting users",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { usuario } = req
        const { _id } = usuario._id
        const { newPassword, password } = req.body
        const user = await User.findById(_id)
        const matchOldAndNewPassword = await verify(user.password, newPassword)
        const validPassword = await verify(user.password, password)
        
        if(!validPassword){
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            })
        }
        
        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the previous one"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(_id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error: err.message
        })
    }
}
