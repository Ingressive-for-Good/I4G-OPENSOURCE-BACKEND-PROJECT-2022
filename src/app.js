const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require("passport")
const session = require('express-session')
const path = require("path")

const { cloudinary } = require('./utils/helpers')

const productRoutes = require('./modules/product/product.routes')
const profileRoutes = require('./modules/profile/profile.route')
const userRoutes = require("./modules/user/user.routes")
const categoryRoutes = require('./modules/category/category.route')

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
app.use('/profile', profileRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)

//redirect to google sign in page
app.get(
    '/oauth/google', 
    passport.authenticate("google", 
    {
        scope: ["profile", "email"]
    }
    )
)

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
