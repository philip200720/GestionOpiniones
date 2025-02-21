export const hasRoles = (...roles) => {
    return(req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "It is required to validate the role before validating the token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message: `Unauthorized user, The resource requires one of the following roles: ${roles}`
            })
        }
        next()
    }
}