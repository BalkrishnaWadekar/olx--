const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userContact: {
        type: Number,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, { timestamp: true })

module.exports = mongoose.model("registerUser", userSchema)