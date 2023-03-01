const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true
    },
    adminRefused: {
        type: Boolean,
        require: true
    },
    adminVerified: {
        type: Boolean,
        require: true
    },
    published: {
        type: Boolean,
        require: true
    },
    productDescription: {
        type: String,
        require: true
    },
    productOwner: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    productInfo: {
        type: String,
        require: true
    },
    productImage: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    productCategory: {
        type: String,
        require: true
    },
}, { timestamps: true })

module.exports = mongoose.model("productData", productSchema)