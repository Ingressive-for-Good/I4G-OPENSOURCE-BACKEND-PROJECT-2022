const mongoose = require("mongoose")
const googleStrategy = require('passport-google-oauth20').Strategy

const {logger} = require("../helper/logger")
const { DB_URI } = require("../utils/config")
const {
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET
} = require("../utils/config")
const user = require("../modules/user.model")


exports.database = function(connectMongoose) {
    connectMongoose
    .connect(DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        logger.info('connected to the database successfully')
    })
    .catch((err) => {
        logger.info(err)
    })

}


exports.googleOAuth = function (Passport) {
    Passport.serializeUser( function(user, cb) {    
        cb(null, user)
    } )
    
    Passport.deserializeUser( function (id, cb) {
        user.findById(id, (err, user) => {
            cb(err, user)
        })
    })
    
        Passport.use(new googleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5000/oauth2/redirect/google"
            },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    const existingUser = await user.findOne({googleId: profile.id})
    
                    if (existingUser) return cb(null, existingUser)
    
                    logger.info("google creating new user....")
    
                    const newUser = await new user(
                        {
                        googleId: profile.id,
                        fullname: profile.displayName,
                        email: profile.emails[0].value
                    }).save()
    
                    return cb(null, newUser)
                } catch (err) {
                    return cb(err, false)
                }
            }
        ))
}