export const normalizeName = (req, res, next) => {
    if(req.body.name) {
        req.body.name = req.body.name.trim().toLowerCase()
    }
    next()
}