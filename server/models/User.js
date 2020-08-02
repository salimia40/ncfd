const {Schema , model } = require('mongoose')
const shortid = require('shortid')

const userSchema = new Schema({
    payeer : {
        type: String,
        required: true,
        unique: true
    },
    joined: {
        type: Date,
        default: Date.now
    },
    balance : {
        type: Number,
        default: 0
    },
    referid : {
        type: String,
        default: shortid
    },
    referer : String
})

const User = model('User',userSchema)

module.exports = User