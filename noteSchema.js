const mongoose = require('mongoose')

const schema = mongoose.Schema;

const noteSchema = new schema({
    title:String,
    date:String,
    note:String
}) 

const Data = mongoose.model('Data',noteSchema)

module.exports = Data;
