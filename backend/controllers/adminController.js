const adminData = require("../models/adminModel")
const bcrypt = require("bcryptjs")

exports.adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        req.body.adminPassword = await bcrypt.hash(req.body.adminPassword, salt)
        const result = await adminData.create(req.body)
        res.json({
            success: true,
            message: "Admin registerd successfully!",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Admin Registration Failed, Error : " + error
        })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password);
        const result = await adminData.findOne({ adminEmail: email })
        console.log(result);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Admin email is not valid!"
            })
        }
        // console.log(email, password);
        // console.log(email, password)

        const verifyPassword = await bcrypt.compare(password, result.adminPassword)
        console.log("bbb");

        if (!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is not valid!"
            })
        }

        res.json({
            success: true,
            message: "Admin logged in successfully!",
            result: {
                adminName: result.adminName,
                adminEmail: result.adminEmail
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Admin login request failed, Error : " + error
        })
    }
}

exports.allAdminData = async (req, res) => {
    try {

        const result = await admin.find()

        res.json({
            success: true,
            message: "All admin data fetched successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Admin login request failed, Error : " + error
        })
    }
}

exports.destroyAdmin = async (req, res) => {
    try {

        const result = await admin.deleteMany()

        res.json({
            success: true,
            message: "Admin data destroyed successfully!",
            result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Admin destroy failed, Error : " + error
        })
    }
} 