const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/userModel")

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await user.findOne({ userEmail: email })
        console.log("xxx");
        console.log(result);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Email Not Found"
            })
        }

        const verifyPassword = await bcrypt.compare(password, result.userPassword)
        if (!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({ userId: result._id }, process.env.SECREAT_KEY)

        res.status(200).json({
            success: true,
            message: "User Login Successful!",
            result: {
                id: result._id,
                userName: result.userName,
                userEmail: result.userEmail,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error ha ahe : " + error
        })
    }
}