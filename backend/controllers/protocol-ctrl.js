const MongoClient = require("mongodb").MongoClient
const url = process.env.REACT_APP_MONGO_CONNECTION_STRING

getProtocolById = async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err
        var dbo = db.db("crawler")
        dbo.collection("protocols").findOne({_id: req.params.id}, function(err, result){
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!result) {
                return res
                    .status(404)
                    .json({ success: false, error: `Protocol not found` })
            }
            return res.status(200).json({ success: true, data: result })
        })
        db.close()
        
    })
}

module.exports = {
    getProtocolById
}