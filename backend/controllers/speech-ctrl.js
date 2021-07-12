const Speech = require("../models/speech-model")

createSpeech = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a speech',
        })
    }

    const speech = new Speech(body)

    if (!speech) {
        return res.status(400).json({ success: false, error: err })
    }

    speech
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: speech._id,
                message: 'Speech created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Speech not created!',
            })
        })
}

getSpeechById = async (req, res) => {
    return res.status(200).json({ success: true, data: {"id": "123123", "title":"someawesometitle", "speaker":"somenoncorruptspeaker", "affiliation":"gro0artige partei", "date": "20-04-1969"} })
    // return res.status(200).json({response: "hello world"})
    // await Speech.findOne({ _id: req.params.id }, (err, Speech) => {
    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     }

    //     if (!Speech) {
    //         return res
    //             .status(404)
    //             .json({ success: false, error: `Speech not found` })
    //     }
    //     return res.status(200).json({ success: true, data: Speech })
    // }).catch(err => console.log(err))
}

module.exports = {
    getSpeechById,
    createSpeech
}