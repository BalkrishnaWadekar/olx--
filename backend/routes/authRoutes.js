const express = require("express")
const { login } = require("../controllers/authController")

const router = express.Router()
//https://olx-express-backend.vercel.app/api/auth/login
router.route("/login").post(login)

module.exports = router

