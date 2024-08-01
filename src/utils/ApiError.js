//API handle/eror ka response bhejne ka standardization tareeka
class ApiError extends Error {
    constructor(
        statuscode,
        message =  "Something went worong",
        errors = [],
        stack = ""

    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        //read nodejs documentation achhe se
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}