import mongoose from "mongoose"

// Information needed to create a new User
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: false, unique: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User