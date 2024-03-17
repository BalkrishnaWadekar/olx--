const express = require("express")
const { signUpUser, getAllUser, destroyUsers, deleteUserByAdmin } = require("../controllers/userController")

const router = express.Router()

// https://olx-express-backend.vercel.app/api/user/signup
router.route("/signup").post(signUpUser)

// https://olx-express-backend.vercel.app/api/user/getallusers
router.route("/getallusers").get(getAllUser)

// https://olx-express-backend.vercel.app/api/user/delete
router.route("/delete/:userId").delete(deleteUserByAdmin)

// https://olx-express-backend.vercel.app/api/user/destroyusers
router.route("/destroyusers").delete(destroyUsers)

module.exports = router