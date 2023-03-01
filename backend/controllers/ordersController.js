const orders = require("../models/ordersModel")

exports.placeOrder = async (req, res) => {
    try {
        console.log(req.body);
        const result = await orders.create(req.body)

        res.json({
            success: true,
            message: "Order placed successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Product order failed , Error : ${error}`
        })
    }
}

exports.getUserOrderedItems = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, req.body);
        const result = await orders.find({ buyerId: id })

        res.json({
            success: true,
            message: "User Ordered Items Fetched successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed! Ordered Items Of User Fetching failed , Error : ${error}`
        })
    }
}

exports.receivedOrders_User = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, req.body);
        const result = await orders.find({ productOwnerId: id })

        res.json({
            success: true,
            message: "Received Orders Fetching successfull!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed! Received Orders Fetching failed , Error : ${error}`
        })
    }
}

// exports.getUserOrdersItems = async (req, res) => {
//     try {
//         // console.log(req.body);
//         const { id } = req.params
//         const result = await cart.find({ buyerId: id })

//         res.json({
//             success: true,
//             message: "User Cart Items Fetched Successfully!",
//             result
//         })

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: `Product Add To Cart failed , Error : ${error}`
//         })
//     }
// }

// exports.removeUserCartItems = async (req, res) => {
//     try {
//         // console.log(req.body);
//         const { id } = req.params
//         console.log(id);
//         const result = await cart.findByIdAndDelete(id)

//         res.json({
//             success: true,
//             message: "Item Removed From Cart Successfully!",
//             result
//         })

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: `Remove Cart Item failed , Error : ${error}`
//         })
//     }
// }

exports.destroyOrders = async (req, res) => {
    try {
        const result = await orders.deleteMany()
        res.json({
            success: true,
            message: "All Orders Destroyed Deleted Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Destroy Orders Failed!"
        })
    }
}