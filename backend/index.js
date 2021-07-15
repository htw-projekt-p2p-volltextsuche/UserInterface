const express = require('express')
const protocolRouter = require("./routes/protocol-router")
var cors = require('cors')

const app = express()
const apiPort = 3001
app.use(cors())
app.use('/api', protocolRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))