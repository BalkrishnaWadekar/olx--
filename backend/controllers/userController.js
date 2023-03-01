const bcrypt = require("bcryptjs")
const user = require("../models/userModel")

exports.signUpUser = async (req, res) => {
    try {
        console.log(req.body);
        const salt = await bcrypt.genSalt()
        req.body.userPassword = await bcrypt.hash(req.body.userPassword, salt)
        const result = await user.create(req.body)

        res.json({
            success: true,
            message: "User sign-up successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Sign-up failed , Error : ${error}`
        })
    }
}


exports.getAllUser = async (req, res) => {
    try {
        console.log(req.body);
        const result = await user.find()

        res.json({
            success: true,
            message: "All users fetched successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Users fetch failed , Error : ${error}`
        })
    }
}

exports.deleteUserByAdmin = async (req, res) => {
    try {
        const result = await user.findByIdAndDelete(req.params.userId)

        res.json({
            success: true,
            message: "Users deleted successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Users delete failed , Error : ${error}`
        })
    }
}

exports.destroyUsers = async (req, res) => {
    try {
        const result = await user.deleteMany()

        res.json({
            success: true,
            message: "All users destoyed successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Users destoy failed , Error : ${error}`
        })
    }
}
