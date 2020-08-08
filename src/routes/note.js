const noteRoute = require('express').Router()
const logger = require('node-color-log')
const {json} = require("rc");
const {jsonErrorResponse, jsonResponse, jsonError} = require('./../../utils/jsonResponse')
const {Note, validateNote} = require('../model/addnote_model')

noteRoute.get('/all', async (request, response) => {
    let result = await Note.find()
        .then(result => jsonResponse(response, result))
        .catch(error => jsonErrorResponse(response, 404, error))

})

noteRoute.post('/add', async (request, response) => {
    let {error} = validateNote(request.body)
    if (error) return jsonErrorResponse(response, 400, error)

    let note = Note({
        title: request.body.title,
        description: request.body.description
    })

    let result = await note.save()
        .then(result => {
            if (!result) return jsonErrorResponse(response, 500, result)
            noteAdded(response)
        })
        .catch(error => jsonErrorResponse(response, 500, error))

})


noteRoute.get('/note/:id', async (request, response) => {

    let result = await Note.findById(request.params.id)
        .then(result => {
            if (!result) return jsonErrorResponse(response, 404, 'not found')
            jsonResponse(response, result)
        })
        .catch(error => jsonErrorResponse(response, 500, error))
})


noteRoute.put('/update/:id', async (request, response) => {

    let {error} = validateNote(request.body)
    if (error) return jsonErrorResponse(response, 400, error.details[0].message)

    let note = await Note.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        description: request.body.description
    }).then(result => {
        if (!result) jsonError(response, 'not found')
        jsonResponse(response, result)
    })
        .catch(error => jsonErrorResponse(response, 500, error));

})


noteRoute.delete('/delete/:id', async (request, response) => {

    logger.info(request.params.id)
    let result = await Note.findByIdAndDelete(request.params.id)
        .then(result => {
            if (!result) jsonErrorResponse(response, 400, 'not found')
            response.send(result)
        })
        .catch(error => jsonErrorResponse(response, 500, error))
})


function noteAdded(response) {
    response.set({'content-type': 'application/json; charset=utf-8'});
    return response.json({success: true})

}

module.exports = noteRoute