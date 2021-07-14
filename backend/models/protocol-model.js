const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../db')

const Protocol = new Schema(
    {
    _id: {type: String},
    // Title of the protocol.
    Title: {type: String},
    
    // The name of the speaker.
    Speaker: {type: String},

    // Affiliation of the speaker. This can be his/her role in the Bundestag or for example his party.
    Affiliation: {type: String},

    // Date of the protocol in the format dd.mm.yyyy
    Date: {type: Date},

    // Entire processed content of the protocol.
    Text: {type: String}
    }
)

module.exports = mongoose.model("protocol", Protocol)