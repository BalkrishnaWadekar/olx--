const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true
    },
    productOwnerId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    buyerEmail: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("cartData", cartSchema)