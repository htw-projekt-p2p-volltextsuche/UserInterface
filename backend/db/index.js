const mongoose = require('mongoose')
const url = process.env.REACT_APP_MONGO_CONNECTION_STRING
console.log(url)

function connect(params) {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
}

connect()
const db = mongoose.connection
    db.once('open', _ => {
      console.log('Database connected:', url)
    })
    
    db.on('error', err => {
      console.error('connection error:', err)
      connect()
    })
module.exports = db