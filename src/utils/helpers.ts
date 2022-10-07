import {v2} from "cloudinary"
import { NextFunction, Request, Response } from "express"

import { CLOUD_NAME, API_KEY, API_SECRET } from "./config"

export function handleResponse (payload: any, message = "success") {
    return {
        success: true,
        message,
        data: payload || {}
    }
}

export function cloudinary(_req: Request, _res: Response, next: NextFunction) {
    v2.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET
    })

    return next()
}