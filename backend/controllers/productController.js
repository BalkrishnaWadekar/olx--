const { default: mongoose } = require("mongoose");
const product = require("../models/productModel")

exports.addProduct = async (req, res) => {
    console.log("zzz", req.body);
    try {
        const result = await product.create(req.body)
        console.log("rr", result);
        res.json({
            success: true,
            message: "Product Added Successfull!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product Added Failed!"
        })
    }
}

exports.destroyUserProducts = async (req, res) => {
    const { userId } = req.params
    try {
        const result = await product.deleteMany({ userId })
        res.json({
            success: true,
            message: "Users All Products Deleted Successfull!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Delete All Product Of User Failed!"
        })
    }
}

exports.destroyAllProducts = async (req, res) => {
    try {
        const result = await product.deleteMany()
        res.json({
            success: true,
            message: "All Products Deleted Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Delete All Product Failed!"
        })
    }
}

exports.deleteSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const result = await product.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "Single Product Deleted Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: " Failed! Single Product Delete Failed"
        })
    }
}


exports.getAllProducts = async (req, res) => {
    try {
        const result = await product.find()
        res.json({
            success: true,
            message: "Products Fetched Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product Fetched Failed!"
        })
    }
}

exports.getUserProducts = async (req, res) => {
    try {
        const result = await product.find({ userId: req.params.userId })
        res.json({
            success: true,
            message: "User Products Fetched Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User Product Fetched Failed!"
        })
    }
}



exports.getToVerifyProducts = async (req, res) => {
    try {
        const result = await product.find({ adminVerified: false, published: false, adminRefused: false })
        console.log(result);
        res.json({
            success: true,
            message: "All products for verification sent to admin Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed! All products for verification sent failed.."
        })
    }
}

exports.adminProductControls = async (req, res) => {
    try {
        console.log(req.params.id, req.body);
        const { method } = req.body
        switch (method) {
            case "reject":
                const rejectResult = await product.findByIdAndUpdate(req.params.id, {
                    adminRefused: true,
                    adminVerified: false,
                    published: false
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product rejection successful!",
                    rejectResult
                })

            case "verify":
                const verifyResult = await product.findByIdAndUpdate(req.params.id, {
                    adminVerified: true
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product verification successful!",
                    verifyResult
                })

            case "publish":
                const publishResult = await product.findByIdAndUpdate(req.params.id, {
                    published: true
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product published successfully!",
                    publishResult
                })

            case "cancelreject":
                const cancelRejectResult = await product.findByIdAndUpdate(req.params.id, {
                    adminRefused: false
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product verify cancelled successfully!",
                    cancelRejectResult
                })

            case "cancelVerify":
                const cancelVerifyResult = await product.findByIdAndUpdate(req.params.id, {
                    adminVerified: false
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product verify cancelled successfully!",
                    cancelVerifyResult
                })

            // case "publish":
            //     const publishProduct = await product.findByIdAndUpdate(req.params.id, {
            //         published: true
            //     },
            //         { new: true })

            //     return res.json({
            //         success: true,
            //         message: "Product published  successfully!",
            //         publishProduct
            //     })

            case "unPublish":
                const unPublishProduct = await product.findByIdAndUpdate(req.params.id, {
                    published: false,
                    adminVerified: false
                },
                    { new: true })

                return res.json({
                    success: true,
                    message: "Product published  successfully!",
                    unPublishProduct
                })

            default: return res.status(400).json({
                success: false,
                message: "No methods matched!"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error : " + error
        })
    }
}


exports.getAllRejectedProducts = async (req, res) => {
    try {
        const result = await product.find({ adminRefused: true })
        console.log(result);
        res.json({
            success: true,
            message: "All products for verification sent to admin Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed! All products for verification sent failed.."
        })
    }
}

exports.getAllVerifiedProducts = async (req, res) => {
    try {
        const result = await product.find({ adminVerified: true, published: false })
        console.log(result);
        res.json({
            success: true,
            message: "All products for verification sent to admin Successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed! All products for verification sent failed.."
        })
    }
}


exports.editRejectedProduct = async (req, res) => {
    try {
        const { id } = req.params
        const result = await product.findByIdAndUpdate(id, req.body, { new: true })
        console.log(result);
        res.json({
            success: true,
            message: "Rejected Product Update Successful!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed! Rejected Product Update failed!, Error : " + error
        })
    }
}
