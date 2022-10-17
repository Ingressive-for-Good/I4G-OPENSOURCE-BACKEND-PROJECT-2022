module.exports = {
    authenticateUser: async (req, res)=>{
        const {email, password} = req.body
        try {
            const user = await User.findOne({email})
            if(user){
                bcrypt.compare(password, user.password)
                    .then(geniun=>{
                        const token = jwt.sign({
                            ...user,
                            password: undefined
                        }, API_SECRET, {expiresIn: "1d"})
                        return res.status(201).json({
                            user,
                            token,
                            status: 201,
                            validity: "24h",
                            refreshed: false,
                            message: "user session started.",
                            created_at: new Date().toJSON("time"),
                        })
                    })
                    .catch(err=>{
                        return res.status(501).json({
                            ...err,
                            message: "A server error occured, and could not login user",
                            token: "null",
                            status: 501
                        }) 
                    })
            }
        } catch (error) {
            return res.status(501).json({
                ...error,
                message: "A server error occured, and could not login user",
                status: 501
            }) 
        }
    },

    verifyUser: (req, res, next) => {
        try {
            const token = req.headers['Authorization'].split(' ')[1]
            req.user = jwt.verify(token, API_SECRET)
            next()
        } catch (error) {
            return res.status(401).json({...error,status: 401, message: "Error verifying user"})
            // handle the error, in the preceding middleware.
            // next(error)            
        }
    }

}
