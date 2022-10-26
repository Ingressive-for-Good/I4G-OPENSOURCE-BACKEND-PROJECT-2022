const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const path = require('path')

const userRoutes = require('./modules/user/user.route')
const productRoutes = require('./modules/product/product.route')
const profileRoutes = require('./modules/profile/profile.route')
const categoryRoutes = require('./modules/category/category.route')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '50kb' }))
    .use(cors())
    .use(helmet())
    .use(
        session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
        })
    )
    .use(passport.authenticate('session'))
    .use(passport.initialize())
    .use(passport.session())

//routes handler
app.use('/api/v1/auth', userRoutes)
    .use('/api/v1/profile', profileRoutes)
    .use('/api/v1/categories', categoryRoutes)
    .use('/api/v1/products', productRoutes)

// redirect to google sign in page
app.get(
    '/oauth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
)

//redirect user to the success or failure page from google sign in page
app.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/success',
    })
)

//redirect user to facebook login page
app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email'],
    })
)

//redirect user from facebook login page to success or failure login page
app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/failure',
        successRedirect: '/success',
    })
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

app.get('/OAuth/login', (req, res) => {
    res.render('auth')
})

module.exports = { app }
