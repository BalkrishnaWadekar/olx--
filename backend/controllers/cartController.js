const cart = require("../models/cartModel")

exports.addToCart = async (req, res) => {
    try {
        // console.log(req.body);
        const result = await cart.create(req.body)

        res.json({
            success: true,
            message: "Product Added To Cart successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Product Add To Cart failed , Error : ${error}`
        })
    }
}

exports.getUserCartItems = async (req, res) => {
    try {
        // console.log(req.body);
        const { id } = req.params
        const result = await cart.find({ buyerId: id })

        res.json({
            success: true,
            message: "User Cart Items Fetched Successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Product Add To Cart failed , Error : ${error}`
        })
    }
}

exports.removeUserCartItems = async (req, res) => {
    try {
        // console.log(req.body);
        const { id } = req.params
        console.log(id);
        const result = await cart.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Item Removed From Cart Successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Remove Cart Item failed , Error : ${error}`
        })
    }
}

exports.removeOrderedCartItems = async (req, res) => {
    try {
        // console.log(req.body);
        _ids = req.body;

        _ids.forEach(async _id => {
            await cart.deleteOne({ _id: _id._id });
        });

        res.json({
            success: true,
            message: "Ordered Item Removed From Cart Successfully!"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Remove Ordered Item Of Cart Failed , Error : ${error}`
        })
    }
}


exports.destroyCart = async (req, res) => {
    try {
        const result = await cart.deleteMany()
        res.json({
            success: true,
            message: "Cart Destroyed Deleted Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Destroy Cart Failed!"
        })
    }
}