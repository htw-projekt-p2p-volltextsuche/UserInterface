const express = require('express')

const SpeechCtrl = require("../controllers/speech-ctrl")

const router = express.Router()

router.get("/speech/:_id", SpeechCtrl.getSpeechById)

router.post('/speech', SpeechCtrl.createSpeech)

module.exports = router