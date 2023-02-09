import mongoose from "mongoose"

// Information needed to create a new game History for a User
const historySchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        history: { type: Array, required: true },
    },
    {collection: 'games'}
)

const History = mongoose.models.History || mongoose.model('History', historySchema)

export default History