const mongoose = require('mongoose')

// Information needed to create a new game History for a User
const History = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        history: { type: Array, required: true },
    },
    {collection: 'games'}
)

const model = mongoose.model('GameHistory', History)

module.exports = model