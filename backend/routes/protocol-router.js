const express = require('express')

const ProtocolCtrl = require("../controllers/protocol-ctrl")

const router = express.Router()

router.get("/protocol/:id", ProtocolCtrl.getProtocolById)

module.exports = router