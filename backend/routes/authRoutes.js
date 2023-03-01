const express = require("express")
const { login } = require("../controllers/authController")

const router = express.Router()
//http://localhost:5000/api/auth/login
router.route("/login").post(login)

module.exports = router

