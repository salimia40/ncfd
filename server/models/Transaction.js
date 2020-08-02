const {Schema , model } = require('mongoose')

const transactionSchema = new Schema({
    payeer : {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    amount : {
        type: Number,
        default: 0
    },
    status : {
        type: String,
    },
    type : {
        type: String,
    }
})

const Transaction = model('Transaction',transactionSchema)

module.exports = Transaction