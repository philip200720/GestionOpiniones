export const handleErrors = (err, req, res, next) => {
    if(err.status === 400 || err.errors){
        return res.status(400).json({
            succes: false,
            errors: err.errors
        })
    }
    return res.status(500).json({
        succes: false,
        message: err.message
    })
}