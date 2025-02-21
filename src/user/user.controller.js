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

export const updateUser = async (req, res) => {
    try{
        const { usuario } = req
        const { role } = usuario
        const data = req.body

        if(role === "ADMIN_ROLE"){
            if(data.uid){
                const { uid } = data
                console.log(uid)
                const user = await User.findById(uid)
                console.log(user.role)
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
            console.log(uid)
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
            }else if(data.status){
                return res.status(405).json({
                    success: false,
                    message: "Unable to switch status in update method"
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