

require("dotenv").config()

const {env}= process

const PORT =  env.port || 5000
const CLOUD_NAME = env.cloud_name
const API_KEY = env.api_key
const API_SECRET = env.api_secret
const DB_URI = env.db_uri

module.exports = {
    PORT,
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
    DB_URI
}