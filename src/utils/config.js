require('dotenv').config()

const { env } = process

const PORT = env.port || 5000
const CLOUD_NAME = env.cloud_name
const API_KEY = env.api_key
const API_SECRET = env.api_secret
const DB_URI = env.db_uri
const GOOGLE_CLIENT_ID = env.google_client_id
const GOOGLE_CLIENT_SECRET =env.google_client_secret

module.exports = {
    PORT,
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
    DB_URI,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
}
