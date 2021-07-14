const mongoose = require('mongoose')
const url = process.env.REACT_APP_MONGO_CONNECTION_STRING

function retryConnect(params) {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

}

retryConnect()
const db = mongoose.connection
module.exports = db