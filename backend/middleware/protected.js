const jwt = require("jsonwebtoken")
exports.protected = (req, res, next) => {
    try {

        const token = req.headers.authorization
        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "please provide token"
            })
        }

        const { userId } = jwt.verify(token, process.env.SECREAT_KEY)
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error" + error
        })
    }
}
