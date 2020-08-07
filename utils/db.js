const mongoose = require('mongoose')
const logger = require('node-color-log')

module.exports = function () {
    mongoose.connect('mongodb://localhost/notetaker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => logger.info('Connected to MongoDB...'))
        .catch(error => logger.error('Database is not connected ' + error))
}