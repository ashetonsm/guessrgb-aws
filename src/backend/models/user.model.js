const mongoose = require('mongoose')

// Information needed to create a new User
const User = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {collection: 'users'}
)

const model = mongoose.model('UserData', User)

module.exports = model