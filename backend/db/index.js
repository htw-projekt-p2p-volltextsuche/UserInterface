const mongoose = require('mongoose')
const uri = process.env.REACT_APP_MONGO_CONNECTION_STRING;
console.log(uri);



mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
    db.once('open', _ => {
      console.log('Database connected:', url)
    })
    
    db.on('error', err => {
      console.error('connection error:', err)
    })
module.exports = db