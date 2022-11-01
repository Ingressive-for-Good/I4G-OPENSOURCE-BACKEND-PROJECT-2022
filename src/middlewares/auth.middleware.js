const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { findUser } = require('../modules/user/user.service')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res
                .status(401)
                .send({ success: false, message: 'Unauthorized' })
        }
        const verifyToken = jwt.verify(token, JWT_SECRET)
        const user = await findUser(verifyToken.userId)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist',
            })
        }
        req.user = user
        next()
    } catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

module.exports = {
    auth,
}
