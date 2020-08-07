const noteRoute = require('./note')

function route(app){
    app.use('/api/note' , noteRoute)
}

module.exports.route = route