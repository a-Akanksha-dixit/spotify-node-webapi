
export const errorHandlerMiddleware = (error, req, res, next) => {
    var message = 'Something went wrong'
    if(error.details) {
        message = error.details.map((i) => i.message).join(",")
    } else if(error.message) {
        message = error.message
    }
    console.log(error)
    res.error(message, error)
}