module.exports = function multerErrorHandler(err, req, res, next) {
    if (err) {
        return res.status(400).send({ message: err.message })
    }
    next()
}
