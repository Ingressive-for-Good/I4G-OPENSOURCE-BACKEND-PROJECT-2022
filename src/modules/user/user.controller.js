const { createUser, findUser, findUserByEmail } = require('./user.service')
const {
    handleResponse,
    isPasswordMatch,
    generateToken,
} = require('../../utils/helpers')

module.exports = {
    createUser: async (req, res) => {
        try {
            const response = await createUser(req.body)

            res.status(201).json(handleResponse(response))
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    },
    loginUser: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing',
            })
        }
        try {
            const user = await findUserByEmail(req.body.email)

            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: `User with email ${req.body.email} does not exist`,
                })
            }
            const checkPassword = isPasswordMatch(
                req.body.password,
                user.password
            )
            if (!checkPassword) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid email or password',
                })
            }
            const token = generateToken(user._id)
            res.cookie('token', token, {
                path: '/',
                httpOnly: true,
                // expires in 7 days
                expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 7),
                // uncomment the code below in production (used for https requests)
                // sameSite: 'none',
                // secure: true,
            })
            res.status(200).json(handleResponse(user))
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    },
    logoutUser: async (req, res) => {
        res.cookie('token', '', {
            path: '/',
            httpOnly: true,
            // expires in 0s
            expires: new Date(0),
            // required for https requests (used in production)
            // sameSite: 'none',
            // secure: true,
        })
        return res
            .status(200)
            .send({ success: true, message: 'User logged out successfully' })
    },
    findUser: async (req, res) => {
        const { userId } = req.params
        try {
            const user = await findUser(userId)
            if (!user)
                return res.status(404).send({
                    success: false,
                    message: `User with id: ${userId} doesn't exist`,
                })

            res.status(200).json(handleResponse(user))
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    },
}
