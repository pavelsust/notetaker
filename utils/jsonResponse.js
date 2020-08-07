function jsonErrorResponse(response, statusCode, errorMessage) {
    response.set({'content-type': 'application/json; charset=utf-8'});
    return response.status(statusCode).json({error: `${errorMessage}`})

}

function jsonError(response, successMessage) {
    return response.json({error: `${successMessage}`})
}

function jsonResponse(response, item) {
    response.set({'content-type': 'application/json; charset=utf-8'});
    return response.json(item)
}

module.exports.jsonResponse = jsonResponse
module.exports.jsonErrorResponse = jsonErrorResponse
module.exports.jsonError = jsonError
