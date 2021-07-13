const Protocol = require("../models/protocol-model")
const MUUID = require("uuid-mongodb")

getProtocolById = async (req, res) => {
    console.log("request doc_id: " + req.params.id);
    await Protocol.findOne({ _id: MUUID.from(req.params.id)}, (err, Protocol) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!Protocol) {
            return res
                .status(404)
                .json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: protocol })
    }).catch(err => console.log(err))
}

module.exports = {
    getProtocolById
}