

export function handleResponse (payload: any, message = "success") {
    return {
        success: true,
        message,
        data: payload || {}
    }
}