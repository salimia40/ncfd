const {Schema , model } = require('mongoose')

const depositSchema = new Schema({
    payeer : {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: () => {
            var now = Date.now()
            var h24 = 1000 * 60 * 60 * 24
            return now + h24
        }
    },
    amount : {
        type: Number,
        default: 0
    },
    profit : {
        type: Number,
        default: 0
    },
    closed : {
        type: Boolean,
        default: false
    }
})

const Deposit = model('Deposit',depositSchema)

module.exports = Deposit