const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const mongoose = require('mongoose')

const mainRoute = require('./routes/routes')
const app = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(express.static('src/public'))
mainRoute.route(app)

require('./../utils/db')()

//PORT
const port = process.env.PORT || 7000
app.listen(port, '0.0.0.0', () => {
    console.log(`listening port ${port}`)
})
