const express = require('express')
const protocolRouter = require("./routes/protocol-router")


const app = express()
const apiPort = 3001

app.use('/api', protocolRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))