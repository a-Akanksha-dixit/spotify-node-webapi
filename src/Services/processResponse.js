export const processResponse = (request, response, next) => {
    response.success = function (result = {}) {
        response.status(200).json({
            response : result
        })
    }

    response.error = function (message = 'unexpected error' , description = {}) {
        response.status(401).json({
            message : message,
            error : description
        })
    }
    next()
}