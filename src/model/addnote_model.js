const mongoose = require('mongoose')
const Joi = require('joi')

let noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },

    description: {
        type: String,
        required: true,
        minlength: 1
    }
})

let Note = mongoose.model('note', noteSchema)

function validateNote(note) {
    let schema = {
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required()
    }

    return Joi.validate(note, schema)
}

module.exports.Note = Note
module.exports.validateNote = validateNote