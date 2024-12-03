export  enum Provider {
    AUTHENTICATION = "AUTHENTICATION ERROR",
    ROUTING = "ROUTING ERROR",
    DATABASE = "DATABASE ERROR",
    VALIDATION = "VALIDATION ERROR",
    PROTOCOL = "PROTOCOL ERROR",
    SERVER = "SERVER ERROR",
    UNKNOWN = "UNKNOWN ERROR",
}

class ApiError extends Error {
    public provider: Provider
    public statusCode: number
    public error: any
    public stack: any
    public data: any
    public success: boolean

    constructor(provider: Provider, message = "Internal Server error", statusCode: number, error: any = [], stack?: any) {
        super(message)
        this.provider = provider
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.error = error
       
        if(stack) {
            this.cause = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }