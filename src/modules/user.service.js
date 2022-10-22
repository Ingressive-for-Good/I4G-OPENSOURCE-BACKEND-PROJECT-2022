const { clientError } = require("../utils/error")
const { hashPassword } = require("../utils/helpers")
const user = require("./user.model")
const {
    signUpValidate
} = require("./user.validator")

const createUser = async ({
    fullname,
    email,
    password
}) => {
     
    try {
       
        const userExists = await user.findOne({email})

        if (userExists) {
            throw new clientError("user credentials already exist", 405)
            
        }

        const User = await new user({
            fullname,
            email,
            password: hashPassword(password)
        }).save()

        return {
            user: {
                fullname,
                email
            }
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    createUser
}