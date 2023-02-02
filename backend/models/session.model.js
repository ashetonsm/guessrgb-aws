const mongoose = require('mongoose')

// Session data
const Session = new mongoose.Schema(
    {
        expires: { type: Date, required: true },
        session: { type: String, required: true },
    },
    {collection: 'sessions'}
)

const model = mongoose.model('SessionData', Session)

module.exports = model