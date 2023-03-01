const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminContact: {
        type: Number,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("adminData", adminSchema)