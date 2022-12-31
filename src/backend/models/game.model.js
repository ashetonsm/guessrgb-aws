const mongoose = require('mongoose')

// Information needed to create a new Game
const Game = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        date: { type: String, required: true },
        result: { type: Object, required: true },
    },
    {collection: 'games'}
)

const model = mongoose.model('GameData', Game)

module.exports = model