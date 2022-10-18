const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require("passport")
const session = require('express-session')
const path = require("path")

const { cloudinary } = require('./utils/helpers')
const profileRoute = require('./modules/profile.route')

const userRoutes = require("../src/modules/user.routes")

const userRouter = require('./modules/user.routes')
const categoryRoutes = require('./routes/category.route')

const userRoutes = require("../src/modules/user.routes")

const userRouter = require('./modules/user.routes')
const categoryRoutes = require('./routes/category.route')

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '50kb' }))
    .use(cors())
    .use(helmet())
    .use('*', cloudinary)
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.authenticate("session"))
    .use(passport.initialize())
    .use(passport.session())
   

//route handler
app.use("/user/v1", userRoutes)

app.use('/profile', profileRoute)

//redirect to google sign in page
app.get(
    '/oauth/google', 
    passport.authenticate("google", 
    {
        scope: ["profile", "email"]
    }
    )
)
    .use('/user', userRouter)


//redirect user to th success or failure page
app.get(
    '/oauth2/redirect/google', 
    passport.authenticate("google", 
    {
        failureRedirect: '/failure',
        successRedirect: '/success'
    }
    )
)


app.get('/failure', (req, res) => {
app.use('/categories', categoryRoutes)

    res.status(200).json({
        message: 'server failed',
    })
})
app.get('/success', (req, res) => {
    res.status(200).json({
        message: 'server',
    })
})

app.get('/google/login',
    (req, res) => {
        res.render('auth')
    }
)

module.exports = { app }
