
const { clientError } = require("../../utils/error")
const { hashPassword, generateCode } = require("../../utils/helpers")
const user = require("./user.model")
const {
    signUpValidate
} = require("./user.validator")
const {sendEmail} = require("../../utils/email")
const {host} = require("../../utils/config")

module.exports = {
    createUser : async ({
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

            User.password = ""

            const Host = `${host}/api/v1/emailVerificationCode`            

            await sendEmail(Host, {
                email,
                subject: "Email verification code valid for 20mins",
                message: `Welcome to techMart! your verification code is ${generateCode()}`,
                text1: "visit",
                text2: " to submit your code"
            })

            return {
                new_user: User
            }
        } catch (error) {
            return error
        }
    }
}
