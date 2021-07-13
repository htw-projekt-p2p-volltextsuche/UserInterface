const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MUUID = require("uuid-mongodb")
const Protocol = new Schema(
    {
    _id: {type: 'object',
    value: { type: 'Buffer' },
    default: () => MUUID.v4(),
      },
    // Title of the protocol.
    Title: {type: String},
    
    // The name of the speaker.
    Speaker: {type: String},

    // Affiliation of the speaker. This can be his/her role in the Bundestag or for example his party.
    Affiliation: {type: String},

    // Date of the protocol in the format dd.mm.yyyy
    Date: {type: [String]},

    // Entire processed content of the protocol.
    Text: {type: String}
    }
)

module.exports = mongoose.model("protocol", Protocol)