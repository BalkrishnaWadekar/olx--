const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        require: true
    },
    productOwnerId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true
    },
    buyerEmail: {
        type: String,
        require: true
    }

}, { timestamps: true })

module.exports = mongoose.model("ordersData", ordersSchema)