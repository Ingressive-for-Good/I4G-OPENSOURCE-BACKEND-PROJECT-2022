const {handleResponse} = require("../utils/helpers")
const userService = require("./user.service")


async function createUserController (req, res, next) {

try {

    const response = await userService.createUser(req.body)

    res.json(handleResponse(response))
} catch (error) {
    res.json(error)
    next(error)
}
}

module.exports = {
    createUserController
}