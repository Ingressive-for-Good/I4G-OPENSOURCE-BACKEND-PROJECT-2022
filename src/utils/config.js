require('dotenv').config()

const { env } = process

module.exports = {
    PORT: env.port || 5000,
    CLOUD_NAME: env.cloud_name,
    API_KEY: env.api_key,
    API_SECRET: env.api_secret,
    DB_URI: env.db_uri,
    GOOGLE_CLIENT_ID: env.google_client_id,
    GOOGLE_CLIENT_SECRET: env.google_client_secret,
    GOOGLE_CALLBACKURL: env.google_callbackURL,
    FACEBOOK_CLIENT_ID: env.facebook_client_id,
    FACEBOOK_CLIENT_SECRET: env.facebook_client_secret,
    FACEBOOK_CALLBACKURL: env.facebook_callbackURL,
    mailtrapPassword: env.password,
    mailtrapUsername: env.username,
    host: env.host || '',
    JWT_SECRET: env.jwt_secret,
}
